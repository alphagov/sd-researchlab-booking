import React from 'react';
import { useMutation } from 'react-apollo-hooks';
import Spinner from '../shared/Spinner';

import { RESEND_REG_LINK } from '../../queries';

const RegisterLinkResend = ({ userId }) => {
  const [resendLink, { loading }] = useMutation(RESEND_REG_LINK);

  const sendLink = async () => {
    let newLink;

    try {
      newLink = await resendLink({
        variables: { id: userId }
      });
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
