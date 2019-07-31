import User from '../models/User';

import { createRegToken } from '../utils/cryptoUtils';

export const getUser = (token) => {
  // temp just return a user object until we add
  return { user: { loggedIn: true } };
};

const authResolvers = {
  registerNewUser: async (
    _,
    { firstName, lastName, email, phone, password }
  ) => {
    // save the user
    // generate auth (jwt) token for link
    // email link to user
    // return the success/token/user?
  }
};
