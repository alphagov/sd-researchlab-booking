import { sign } from 'jsonwebtoken';
import Token from './models/Token';

const urllink = '/api/register/verify';
// process.env.REGISTER_LINK
import LinkCreator from './utils/generateVeriLink';
import { sendRegMail } from './services/NotifyMail';

const createToken = (user, secret, expiresIn) => {
  const { firstName, lastName, email } = user;
  return sign({ firstName, lastName, email }, secret, { expiresIn });
};

const resolvers = {
  Query: {
    getCurrentUser: async (root, args, { currentUser, User }) => {
      if (!currentUser) {
        return null;
      }
      const user = await User.findOne({ email: currentUser.email });

      return user;
    }
  },
  Mutation: {
    registerUser: async (
      root,
      { firstName, lastName, email, phone, password },
      { User }
    ) => {
      // check email is gov.uk? Do this on browser? Will pull from a collection of allowed domains
      if (!email.endsWith('gov.uk')) {
        throw new Error('Must use a Government email address');
      }
      const user = await User.findOne({ email });
      if (user) {
        throw new Error('User already exists');
      }

      const newUser = await new User({
        firstName,
        lastName,
        email,
        phone,
        password
      }).save();
      // generate a link
      const hashlink = await LinkCreator(newUser.email);
      // save hashlink
      const newRegLink = await new Token({
        _userId: newUser.id,
        token: hashlink
      }).save();

      // send email to that address.....
      const mailSend = await sendRegMail(firstName, lastName, email, hashlink);
      console.log('result', mailSend);

      return { token: createToken(newUser, process.env.SECRET, '1hr') };
    }
  }
};

export default resolvers;
