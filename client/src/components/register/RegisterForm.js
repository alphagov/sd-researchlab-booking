import React from 'react';
import { useForm } from '../../hooks/useForm';

const initialState = {
  firstName: { value: '', valid: true },
  lastName: { value: '', valid: true },
  email: { value: '', valid: true },
  mobilePhone: { value: '', valid: true },
  password: { value: '', valid: true }
};

const RegisterForm = () => {
  const [values, handleChange] = useForm(initialState);

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(values);
  };

  return (
    <div className="govuk-grid-column-two-thirds">
      <fieldset className="govuk-fieldset">
        <legend className="govuk-fieldset__legend govuk-fieldset__legend--l">
          <h2 className="govuk-fieldset__heading">Enter your details</h2>
        </legend>
        <form onSubmit={(event) => handleSubmit(event)}>
          <div
            className={`govuk-form-group ${!values.firstName.valid &&
              `govuk-form-group--error`}`}
          >
            <label htmlFor="firstName" className="govuk-label">
              First name
            </label>
            {!values.firstName.valid && (
              <span id="event-name-error" className="govuk-error-message">
                <span className="govuk-visually-hidden">Error:</span> Enter your
                first name
              </span>
            )}
            <input
              type="text"
              className={`govuk-input govuk-!-width-two-thirds ${!values
                .firstName.valid && `govuk-input--error`}`}
              name="firstName"
              id="firstName"
              onChange={handleChange}
              value={values.firstName.value}
            />
          </div>
          <div
            className={`govuk-form-group ${!values.lastName.valid &&
              `govuk-form-group--error`}`}
          >
            <label htmlFor="lastName" className="govuk-label">
              Last name
            </label>
            {!values.lastName.valid && (
              <span id="event-name-error" className="govuk-error-message">
                <span className="govuk-visually-hidden">Error:</span> Enter your
                last name
              </span>
            )}
            <input
              type="text"
              className={`govuk-input govuk-!-width-two-thirds ${!values
                .lastName.valid && `govuk-input--error`}`}
              name="lastName"
              id="lastName"
              onChange={handleChange}
              value={values.lastName.value}
            />
          </div>
          <div
            className={`govuk-form-group ${!values.email.valid &&
              `govuk-form-group--error`}`}
          >
            <label htmlFor="email" className="govuk-label">
              Email
            </label>
            <span id="email-hint" className="govuk-hint">
              This must be a Government or Local Government address.
            </span>
            {!values.email.valid && (
              <span id="event-name-error" className="govuk-error-message">
                <span className="govuk-visually-hidden">Error:</span> Enter your
                email address
              </span>
            )}
            <input
              type="email"
              className={`govuk-input ${!values.email.valid &&
                `govuk-input--error`}`}
              name="email"
              id="email"
              onChange={handleChange}
              value={values.email.value}
            />
          </div>
          <div
            className={`govuk-form-group ${!values.mobilePhone.valid &&
              `govuk-form-group--error`}`}
          >
            <label htmlFor="mobilePhone" className="govuk-label">
              Mobile phone number
            </label>
            {!values.mobilePhone.valid && (
              <span id="event-name-error" className="govuk-error-message">
                <span className="govuk-visually-hidden">Error:</span> Enter your
                mobile phone number
              </span>
            )}
            <input
              type="text"
              className={`govuk-input govuk-!-width-two-thirds ${!values
                .mobilePhone.valid && `govuk-input--error`}`}
              name="mobilePhone"
              id="mobilePhone"
              onChange={handleChange}
              value={values.mobilePhone.value}
            />
          </div>
          <div
            className={`govuk-form-group ${!values.password.valid &&
              `govuk-form-group--error`}`}
          >
            <label htmlFor="password" className="govuk-label">
              Password
            </label>
            {!values.password.valid && (
              <span id="event-name-error" className="govuk-error-message">
                <span className="govuk-visually-hidden">Error:</span> Enter a
                password
              </span>
            )}
            <input
              type="password"
              className={`govuk-input govuk-!-width-two-thirds ${!values
                .password.valid && `govuk-input--error`}`}
              name="password"
              id="password"
              onChange={handleChange}
              value={values.password.value}
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
