import { sign } from 'jsonwebtoken';
import * as bcrypt from 'bcrypt';

const createToken = (user, secret, expiresIn) => {
  const { firstName, lastName, email } = user;
  return sign({ firstName, lastName, email }, secret, { expiresIn });
};

const resolvers = {
  Mutation: {
    registerUser: async (
      root,
      { firstName, lastName, email, phone, password },
      { User }
    ) => {
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
      return { token: createToken(newUser, process.env.SECRET, '1hr') };
    }
  }
};

export default resolvers;
