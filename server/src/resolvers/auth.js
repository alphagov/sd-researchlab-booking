import User from '../models/User';

import { createRegToken } from '../utils/cryptoUtils';
import { sendRegMail } from '../services/NotifyMail';

export const getUser = (token) => {
  // temp just return a user object until we add
  return { user: { loggedIn: true } };
};

const authResolvers = {
  Mutation: {
    registerNewUser: async (
      _,
      { firstName, lastName, email, phone, password }
    ) => {
      // save the user
      try {
        const newUser = await User.create({
          firstName,
          lastName,
          email,
          phone,
          password
        });
        // generate auth (jwt) token for link
        const regToken = await createRegToken({
          id: newUser._id,
          email: newUser.email
        });

        // email link to user
        const regMail = await sendRegMail(
          newUser.firstName,
          newUser.lastName,
          regToken
        );

        return {
          success: true,
          user: newUser,
          token: regToken
        };
      } catch (error) {
        console.log(error);
      }
    }
  }
};

export default authResolvers;
