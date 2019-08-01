import User from '../models/User';

import {
  createRegToken,
  verifyRegToken,
  verifyUserToken,
  createUserToken
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
  Query: {
    registerTokenCheck: async (_, { token }) => {
      try {
        // decrypt the token
        const plainToken = await verifyRegToken(token);
        // get the user
        // update the user? do it in one? findByIdAndUpdate
        const veriUser = await User.findByIdAndUpdate(
          plainToken.id,
          { isVerified: true },
          { new: true }
        );
        // create a new token (with longer expiry.....do wee need this??)
        const veriToken = await createUserToken({
          id: veriUser._id,
          email: veriUser.email
        });
        // return
        return {
          success: true,
          token: veriToken,
          user: veriUser
        };
      } catch (error) {
        return {
          success: false,
          // error: error,
          token: '',
          user: null
        };
      }
    }
  },
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
