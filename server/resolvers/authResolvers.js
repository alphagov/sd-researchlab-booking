import { sign } from 'jsonwebtoken';
import RegToken from '../models/RegToken';

import HashCreator from '../utils/generateHashes';
import { sendRegMail } from '../services/NotifyMail';

const createToken = (user, secret, expiresIn) => {
  const { firstName, lastName, email } = user;
  return sign({ firstName, lastName, email }, secret, { expiresIn });
};

const authResolvers = {
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
      console.log('user', newUser);

      const hashLink = await HashCreator(newUser.email);
      // save hashlink
      console.log('hashlink', hashLink);
      try {
        const newRegLink = await new RegToken({
          email,
          regToken: hashLink
        }).save();

        console.log('reglink', newRegLink);
      } catch (error) {
        console.log('error reglink', error);
      }

      // send email to that address.....
      const mailSend = await sendRegMail(
        firstName,
        lastName,
        email,
        `${process.env.REGISTER_LINK}?token=${hashLink}`
      );

      console.log('mailsend', mailSend);

      return { token: createToken(newUser, process.env.SECRET, '1hr') };
    },
    getRegToken: async (root, { regToken }, { RegToken }) => {
      const newRegToken = await RegToken.findOne({ regToken });
      return newRegToken;
    }
  }
};

export default authResolvers;
