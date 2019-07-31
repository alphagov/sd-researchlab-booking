import React from 'react';
import RegisterForm from '../components/register/RegisterForm';

const Register = () => {
  return (
    <div className="govuk-grid-row">
      <div className="govuk-grid-column-full">
        <span className="govuk-caption-xl">Guidance</span>
        <h1 className="govuk-heading-xl">Register to book a GDS lab</h1>
      </div>
      <div className="govuk-grid-column-two-thirds">
        <p className="govuk-body">
          Enter all the information in the fields below.
        </p>
        <p className="govuk-body">
          You will need access to your email as well a mobile phone.
        </p>
        <p className="govuk-body">
          Only Civil Servants and Local Government employees can register to use
          this service.
        </p>
      </div>
      <RegisterForm />
    </div>
  );
};

export default Register;
