import React from 'react';
import { withRouter } from 'react-router-dom';
import RegLinkResend from './RegLinkResend';

const RegisterConfirm = ({ match }) => {
  const linkId = match.params;
  return (
    <div className="App">
      <h2>Registration Confirmation</h2>
      <p>
        A confirmation link has been sent to your email account please click on
        this link to complete your registration
      </p>
      <p>Didn't receive the email?</p>
      <RegLinkResend regLinkId={linkId} />
    </div>
  );
};

export default withRouter(RegisterConfirm);
