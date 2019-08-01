import User from '../models/User';

import {
  createRegToken,
  verifyRegToken,
  verifyUserToken
} from '../utils/cryptoUtils';
import { sendRegMail } from '../services/NotifyMail';

export const getUser = async (token) => {
  // temp just return a user object until we add
  if (!token) {
    return { user: { loggedIn: false } };
  }
  const plainToken = await verifyUserToken(token.split(' ')[1]);
  console.log(plainToken);
  // return { user: { loggedIn: true } };
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
    },
    registerLinkResend: async (_, { id }) => {
      // get the user
      try {
        const user = await User.findById(id);
        if (!user) {
          throw new Error('User does not exist');
        }

        // generate a new token
        const regToken = await createRegToken({
          id: user._id,
          email: user.email
        });
        // send email
        const regMail = await sendRegMail(
          user.firstName,
          user.lastName,
          regToken
        );

        return {
          success: true,
          token: regToken,
          user
        };
      } catch (error) {
        console.log(error);
        return error;
      }
    }
  }
};

export default authResolvers;
