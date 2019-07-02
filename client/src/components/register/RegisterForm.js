import React from 'react';
import { useForm } from '../../hooks/useForm';

const initialState = {
  firstName: '',
  lastName: '',
  email: '',
  phone: '',
  password: ''
};

const RegisterForm = () => {
  const [values, handleSubmit, handleChange] = useForm(initialState);

  return (
    <div className="govuk-grid-column-two-thirds">
      <fieldset className="govuk-fieldset">
        <legend className="govuk-fieldset__legend govuk-fieldset__legend--l">
          <h2 className="govuk-fieldset__heading">Enter your details</h2>
        </legend>
        <form onSubmit={handleSubmit}>
          <div className="govuk-form-group">
            <label htmlFor="firstName" className="govuk-label">
              First name
            </label>
            <input
              type="text"
              className="govuk-input govuk-!-width-two-thirds"
              name="firstName"
              id="firstName"
              onChange={handleChange}
              value={values.firstName}
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
              onChange={handleChange}
              value={values.lastName}
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
              onChange={handleChange}
              value={values.email}
            />
          </div>
          <div className="govuk-form-group">
            <label htmlFor="mobilePhone" className="govuk-label">
              Mobile phone number
            </label>
            <input
              type="text"
              className="govuk-input govuk-!-width-two-thirds"
              name="mobilePhone"
              id="mobilePhone"
              onChange={handleChange}
              value={values.mobilePhone}
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
              onChange={handleChange}
              value={values.password}
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
