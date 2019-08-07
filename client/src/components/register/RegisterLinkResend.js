import React from 'react';
import { useMutation } from 'react-apollo-hooks';
import Spinner from '../shared/Spinner';

import { RESEND_REG_LINK } from '../../queries';

const RegisterLinkResend = ({ userId }) => {
  const [resendLink, { loading }] = useMutation(RESEND_REG_LINK);

  const sendLink = async () => {
    try {
      const newLink = await resendLink({
        variables: { id: userId }
      });

      const { registerLinkResend } = newLink.data;
      // reset the jwt
      localStorage.setItem('labtoken', registerLinkResend.token);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      {loading ? (
        <Spinner />
      ) : (
        <button className="govuk-button" onClick={sendLink} disabled={loading}>
          Resend confirmation link
        </button>
      )}
    </>
  );
};

export default RegisterLinkResend;
