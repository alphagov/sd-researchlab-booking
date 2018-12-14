import RegToken from '../models/RegToken';

import { hashCreator, createToken } from '../utils/cryptoUtils';
import { sendRegMail } from '../services/NotifyMail';
import addNewUser from './helpers/addNewUser';
import addNewRegLink from './helpers/addNewRegLink';

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

      // add the user to the db
      const newUserReg = await addNewUser({
        firstName,
        lastName,
        email,
        phone,
        password
      });

      if (newUserReg.error) {
        console.log(newUserReg.error._message);
        throw new Error(
          `Unable to create the user: ${newUserReg.error._message}`
        );
      }

      // generate a link
      const hashLink = await hashCreator(newUser.email);

      if (hashLink.error) {
        console.log(hashLink.error);
        throw new Error(
          `Unable to create the registration link: ${hashLink.error}`
        );
      }

      // save hashlink to the regtoken collection
      const newRegLink = await addNewRegLink({
        email,
        regToken: hashLink
      }).save();

      if (newRegLink.error) {
        console.log(newRegLink.error._message);
        throw new Error(
          `Unable to save the registration link: ${newRegLink.error._message}`
        );
      }

      // send email to that address.....
      const mailSend = await sendRegMail(
        firstName,
        lastName,
        email,
        `${process.env.REGISTER_LINK}?token=${hashLink}`
      );

      if (mailSend.error) {
        throw new Error(`Unable to send registration email ${mailSend.error}`);
      }

      // return { token: createToken(newUser, '1hr') };
    },
    getRegToken: async (root, { regToken }, { RegToken }) => {
      const newRegToken = await RegToken.findOne({ regToken });
      return newRegToken;
    }
  }
};

export default authResolvers;
