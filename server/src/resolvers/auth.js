import User from '../models/User';

export const getUser = (token) => {
  // temp just return a user object until we add
  return { user: { loggedIn: true } };
};

const authResolvers = {};
