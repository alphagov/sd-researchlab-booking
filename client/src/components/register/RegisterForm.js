import React, { useState } from 'react';

const RegisterForm = () => {
  const [firstname, setFirstName] = useState({});
  const [lastname, setLastName] = useState({});
  const [emailAddr, setEmailAddr] = useState({});

  return (
    <div className="govuk-grid-column-two-thirds">
      <fieldset className="govuk-fieldset">
        <legend className="govuk-fieldset__legend govuk-fieldset__legend--l">
          <h2 className="govuk-fieldset__heading">Enter your details</h2>
        </legend>
        <form action="">
          <div className="govuk-form-group">
            <label htmlFor="firstName" className="govuk-label">
              First name
            </label>
            <input
              type="text"
              className="govuk-input govuk-!-width-two-thirds"
              name="firstName"
              id="firstName"
              onChange={({ target: { value } }) =>
                setFirstName({ value, valid: value.length > 0 })
              }
            />
          </div>
          <div className="govuk-form-group">
            <label htmlFor="lastName" className="govuk-label">
              Last name
            </label>
            <input
              type="text"
              className="govuk-input govuk-!-width-two-thirds"
              name="lastName"
              id="lastName"
              onChange={({ target: { value } }) =>
                setLastName({ value, valid: value.length > 0 })
              }
            />
          </div>
          <div className="govuk-form-group">
            <label htmlFor="email" className="govuk-label">
              Email
            </label>
            <span id="email-hint" className="govuk-hint">
              This must be a Government or Local Government address.
            </span>
            <input
              type="email"
              className="govuk-input"
              name="email"
              id="email"
              onChange={({ target: { value } }) =>
                setEmailAddr({ value, valid: value.length > 0 })
              }
            />
          </div>
          <div className="govuk-form-group">
            <label htmlFor="mobile-phone" className="govuk-label">
              Mobile phone number
            </label>
            <input
              type="text"
              className="govuk-input govuk-!-width-two-thirds"
              name="mobile-phone"
              id="mobile-phone"
            />
          </div>
          <div className="govuk-form-group">
            <label htmlFor="password" className="govuk-label">
              Password
            </label>
            <input
              type="password"
              className="govuk-input govuk-!-width-two-thirds"
              name="password"
              id="password"
            />
          </div>
          <button type="submit" className="govuk-button">
            Save and continue
          </button>
        </form>
      </fieldset>
    </div>
  );
};

export default RegisterForm;
