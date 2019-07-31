import React from 'react';
import RegLinkResend from './RegisterLinkResend';

const RegisterConfirm = ({ id }) => {
  return (
    <div className="App">
      <h2>Registration Confirmation</h2>
      <p>
        A confirmation link has been sent to your email account please click on
        this link to complete your registration
      </p>
      <p>Didn't receive the email?</p>
      <RegLinkResend userId={id} />
    </div>
  );
};

export default RegisterConfirm;
