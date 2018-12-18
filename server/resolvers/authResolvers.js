import { hashCreator, createToken } from '../utils/cryptoUtils';
import { sendRegMail } from '../services/NotifyMail';
import { addNewUser, updateVerification } from './helpers/userControllers';
import { addNewRegLink, getRegLink, checkRegLink } from './helpers/regLinks';

const authResolvers = {
  Query: {
    getCurrentUser: async (root, args, { currentUser, User }) => {
      if (!currentUser) {
        return null;
      }
      const user = await User.findOne({ email: currentUser.email });

      return user;
    },
    checkRegToken: async (root, { regToken }, { RegToken }) => {
      // get the reg token from the token link
      const regTokenFull = await getRegLink(regToken);
      // if there are no erorrs
      // check the link has not expired
      const checkLink = await checkRegLink(regTokenFull._id);
      if (!checkLink) {
        // update the user to verified
        // need to return ok
      }
      return {
        ok: false,
        _id: regTokenFull.userId,
        error: 'Token has expired'
      };
    }
  },
  Mutation: {
    confirmRegistration: async (root, { _id }, { User }) => {
      const verifyUser = await updateVerification(_id, true);
      if (verifyUser.error) {
        console.log(verifyUser.error._message);
        return { ok: false, error: verifyUser.error._message };
      }
      return {
        _id,
        ok: true
      };
    },
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
        return {
          ok: false,
          error: newUserReg.error._message
        };
      }

      // generate a link
      const hashLink = await hashCreator(newUserReg.email);

      if (hashLink.error) {
        console.log(hashLink.error);
        return {
          ok: false,
          error: `Unable to create the registration link: ${hashLink.error}`
        };
      }

      // console.log(newUserReg);

      // // save hashlink to the regtoken collection
      const newRegLink = await addNewRegLink({
        userId: newUserReg._id,
        regToken: hashLink
      });

      if (newRegLink.error) {
        console.log(newRegLink.error._messsage);
        return { ok: false, error: newRegLink.error._message };
      }

      // console.log(newRegLink);

      // // send email to that address.....
      const mailSend = await sendRegMail(
        firstName,
        lastName,
        email,
        `${process.env.REGISTER_LINK}?token=${hashLink}`
      );

      if (mailSend.error) {
        return {
          ok: false,
          error: `Unable to send registration email ${mailSend.error}`
        };
      }

      return {
        _id: newRegLink._id,
        ok: true
        // token: createToken(newUser, '1hr')
      };
    }
  }
};

export default authResolvers;
