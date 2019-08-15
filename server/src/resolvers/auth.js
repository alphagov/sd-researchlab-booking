import User from '../models/User';
import TwoFactor from '../models/Twofactor';

import {
  verifyUserToken,
  createUserToken,
  hashCompare,
  MFACreator
} from '../utils/cryptoUtils';
import { sendRegMail } from '../services/NotifyMail';
import { sendMFACode } from '../services/NotifyText';

export const getUser = async (token) => {
  // this will add the user to the graphql context

  const chkToken = token.split(' ')[1];

  // console.log('chkYoken', chkToken);
  let userContext = {};

  if (!chkToken || chkToken === 'null') {
    // console.log('nope');
    userContext = { user: null, error: { name: 'TokenNotPresent' } };
    return userContext;
  }

  try {
    const plainToken = await verifyUserToken(chkToken, '1h');
    console.log('get user', plainToken);
    const { verifySuccess, clearToken, error } = plainToken;
    // if unable to verify the token expired etc....
    if (!verifySuccess) {
      userContext = { user: null, error: { name: error.name } };
      return userContext;
    } else {
      userContext = { user: clearToken.id, error: null };
      return userContext;
    }
  } catch (error) {
    console.log('[userContext]', error);
  }
};

const mfaCodeHelper = async (user) => {
  // userId
  let mfa = await MFACreator();
  // this is temp. notify does not allow to send texts in demo mode
  // console.log('[mfaCode]', mfa);
  try {
    // send the code
    await sendMFACode(user.phone, mfa);
    // add to user account
    //  add token to token model
    const newToken = await TwoFactor.create({ token: mfa });
    // add token id to user
    console.log('newToken', newToken);

    await User.findByIdAndUpdate(
      user._id,
      { $set: { mfaCode: newToken._id } },
      { new: true }
    );
    return true;
  } catch (error) {
    console.log('[mfaCodeHelper]', error);
    return false;
  }
};

const authResolvers = {
  Query: {
    checkUserVerified: async (_, args, { userContext }) => {
      const { user, error } = userContext;

      console.log('[check user verified]', user);

      if (!user) {
        return {
          success: false,
          reason: error.name,
          user: null
        };
      }

      if (!user.isVerified) {
        return {
          success: false,
          reason: 'Not confirmed registration',
          user: null
        };
      }

      return {
        success: true,
        reason: '',
        user
      };
    },
    enter2FACode: async (_, { mfaCode }, { userContext }) => {
      // first check to see if there is a jwt and it is valid
      const { user, error } = userContext;
      // if the token is not valid....for any reason
      if (!user) {
        return {
          success: false,
          reason: error.name,
          user: null
        };
      }
      console.log('[code]', mfaCode);

      const mfaUser = await User.findById(user).populate('mfaCode');
      // if the codes do not match
      console.log('[mfauser]', mfaUser.mfaCode.token);
      // console.log('mfauser', mfaUser);

      const { token } = mfaUser.mfaCode;

      if (token !== mfaCode) {
        return {
          success: false,
          reason: 'IncorrectMFACode',
          user: null
        };
      }

      return {
        success: true,
        reason: '',
        user: mfaUser
      };
    },
    resend2FACode: async (_, args, { userContext }) => {
      // first check to see if there is a jwt and it is valid
      const { user, error } = userContext;
      // if the jwt is not valid....for any reason
      if (!user) {
        return {
          success: false,
          reason: error.name,
          user: null
        };
      }

      // get user object
      try {
        const resendMFA = await User.findById(user);

        const okCode = await mfaCodeHelper(resendMFA);
        if (!okCode) {
          return {
            success: false,
            reason: error.name,
            user: null
          };
        }

        return {
          success: true,
          reason: '',
          user: resendMFA
        };
      } catch (error) {
        return {
          success: false,
          reason: error.name,
          user: null
        };
      }
    },
    signInUser: async (_, { email, password }, { userContext }) => {
      // get the user from the db
      try {
        const signin = await User.findOne({ email });

        // if they don't exist....need to change this to a generic
        if (!signin) {
          return {
            success: false,
            token: '',
            user: null
          };
        }

        // compare password with hashed password
        // need to change error
        const comparePass = await hashCompare(password, signin.password);
        if (!comparePass) {
          return {
            success: false,
            token: '',
            user: null
          };
        }

        let signInToken = await createUserToken(
          {
            id: signin._id,
            email: signin.email
          },
          '1h'
        );

        // console.log('siggy', signInToken);

        // need to send 2fa code here
        await mfaCodeHelper(signin);

        return {
          success: true,
          token: signInToken.newToken,
          user: signin
        };
      } catch (error) {
        console.log(error);
      }
    },
    registerTokenCheck: async (_, { token }) => {
      try {
        // decrypt the token
        const regToken = await verifyUserToken(token, 6000000);
        const { verifySuccess, clearToken, error } = regToken;

        if (!verifySuccess) {
          throw new Error(error);
        }
        // get the user
        // update the user? do it in one? findByIdAndUpdate
        const veriUser = await User.findByIdAndUpdate(
          clearToken.id,
          { isVerified: true },
          { new: true }
        );

        const { _id, email } = veriUser;

        // create a new token (with longer expiry.....do wee need this??)
        const veriToken = await createUserToken(
          {
            id: _id,
            email
          },
          '1h'
        );

        console.log('veritoken', veriToken);
        // return
        return {
          success: true,
          token: veriToken.newToken,
          user: veriUser
        };
      } catch (error) {
        return {
          success: false,
          token: null,
          user: null
        };
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
        const regToken = await createUserToken(
          {
            id: user._id,
            email: user.email
          },
          6000000
        );
        const { createSuccess, newToken, error } = regToken;

        // send email
        const regMail = await sendRegMail(
          user.firstName,
          user.lastName,
          newToken
        );

        return {
          success: true,
          token: newToken,
          user
        };
      } catch (error) {
        console.log(error);
        return error;
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
        const regToken = await createUserToken(
          {
            id: newUser._id,
            email: newUser.email
          },
          6000000
        );

        const { createSuccess, newToken, error } = regToken;

        // email link to user
        const regMail = await sendRegMail(
          newUser.firstName,
          newUser.lastName,
          newToken
        );

        return {
          success: true,
          user: newUser,
          token: newToken
        };
      } catch (error) {
        console.log(error);
      }
    }
  }
};

export default authResolvers;
