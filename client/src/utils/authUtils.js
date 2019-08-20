export const checkUser = (labUser) => {
  if (!labUser) {
    return {
      error: {
        status: true,
        message: 'Unknown error'
      }
    };
  }

  if (labUser) {
    const { success, user, reason } = labUser;

    const tokenError = {
      navigate: { url: '/sign-in/email-password' }
    };

    // if the query was not successful
    if (!success) {
      switch (reason) {
        case 'TokenNotPresent':
          return {
            ...tokenError,
            error: {
              status: true,
              message: 'Unable to verify user'
            }
          };

        case 'TokenExpiredError':
          return {
            ...tokenError,
            error: {
              status: true,
              message: 'Your token has expired please sign in again'
            }
          };

        case 'IncorrectMFACode':
          return {
            error: {
              status: true,
              message: 'Incorrect code'
            },
            navigate: { url: '/sign-in/resend-code' }
          };

        default:
          return {
            ...tokenError,
            error: {
              status: true,
              message: 'Unknown error'
            }
          };
      }
    }

    // if the token is ok but they have not completed registration
    if (!user.isVerified) {
      return {
        error: {
          status: true,
          message: 'Please complete registration'
        },
        navigate: { url: `/register/confirm/${user.id}` }
      };
    }

    // if all is ok return an empty error object
    return {
      error: {
        status: false,
        message: ''
      },
      navigate: { url: `` }
    };
  }
};
