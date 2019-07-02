import React from 'react';

const RegisterForm = () => {
  return (
    <div className="govuk-grid-column-two-thirds">
      <fieldset className="govuk-fieldset">
        <legend className="govuk-fieldset__legend govuk-fieldset__legend--l">
          <h2 className="govuk-fieldset__heading">Enter your details</h2>
        </legend>
        <div className="govuk-form-group">
          <label htmlFor="first-name" className="govuk-label">
            First name
          </label>
          <input
            type="text"
            className="govuk-input govuk-!-width-two-thirds"
            name="first-name"
            id="first-name"
          />
        </div>
        <div className="govuk-form-group">
          <label htmlFor="last-name" className="govuk-label">
            Last name
          </label>
          <input
            type="text"
            className="govuk-input govuk-!-width-two-thirds"
            name="last-name"
            id="last-name"
          />
        </div>
        <div className="govuk-form-group">
          <label htmlFor="email" className="govuk-label">
            Email
          </label>
          <input type="email" className="govuk-input" name="email" id="email" />
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
        <button type="submit" class="govuk-button">
          Save and continue
        </button>
      </fieldset>
    </div>
  );
};

export default RegisterForm;
