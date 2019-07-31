import User from '../models/User';

import { createRegToken } from '../utils/cryptoUtils';

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
        console.log('new user', newUser);
        return {
          success: true,
          user: newUser,
          token: 'not done yet'
        };
      } catch (error) {
        console.log(error);
      }

      // generate auth (jwt) token for link
      // email link to user
      // return the success/token/user?
      // return {
      //   success: true,
      //   user: { newUser },
      //   token: 'not done yet'
      // };
    }
  }
};

export default authResolvers;
