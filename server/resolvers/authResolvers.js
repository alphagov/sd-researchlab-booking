import RegToken from '../models/RegToken';

import { hashCreator, createToken } from '../utils/cryptoUtils';
import { sendRegMail } from '../services/NotifyMail';
import addNewUser from './helpers/addNewUser';

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
      //  if the user already exists
      const user = await User.findOne({ email });
      if (user) {
        throw new Error('User already exists');
      }

      const newUserReg = await addNewUser({
        firstName,
        lastName,
        email,
        phone,
        password
      });

      if (newUserReg.error) {
        throw new Error('Unable to create the user', newUserReg.error);
      }

      try {
        // add the user to the db

        // generate a link
        const hashLink = await hashCreator(newUser.email);

        // save hashlink to the regtoken collection
        const newRegLink = await new RegToken({
          email,
          regToken: hashLink
        }).save();

        // send email to that address.....
        const mailSend = await sendRegMail(
          firstName,
          lastName,
          email,
          `${process.env.REGISTER_LINK}?token=${hashLink}`
        );
      } catch (error) {
        throw new Error('Unable to create the user', error);
      }

      return { token: createToken(newUser, '1hr') };
    },
    getRegToken: async (root, { regToken }, { RegToken }) => {
      const newRegToken = await RegToken.findOne({ regToken });
      return newRegToken;
    }
  }
};

export default authResolvers;
