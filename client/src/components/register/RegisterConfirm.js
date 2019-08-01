import React from 'react';
import RegisterLinkResend from './RegisterLinkResend';

const RegisterConfirm = ({ id }) => {
  return (
    <div className="govuk-grid-row">
      <div className="govuk-grid-column-full">
        <div className="govuk-panel govuk-panel--confirmation">
          <h1 className="govuk-panel__title">Registration complete</h1>
          <div className="govuk-panel__body">
            A confirmation link has been sent to your email account please click
            on this link to complete your registration
            <br />
            <br />
            <strong>Didn't receive the email?</strong>
            <br />
            <br />
            <RegisterLinkResend userId={id} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterConfirm;
