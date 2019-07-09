import React from 'react';
import { withRouter } from 'react-router-dom';
import { useForm } from '../../hooks/useForm';

const initialState = {
  firstName: { value: '', valid: true, reason: '' },
  lastName: { value: '', valid: true, reason: '' },
  email: { value: '', valid: true, reason: '' }
};

const BookingFormName = ({ history }) => {
  const [values, handleChange] = useForm(initialState);

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(values);
    // if everything works ok move to next part of form
    history.push('/book-a-research-lab/booking-details');
  };

  return (
    <div className="govuk-grid-column-full">
      <div className="govuk-form-group">
        <fieldset className="govuk-fieldset">
          <legend className="govuk-fieldset__legend govuk-fieldset__legend--l">
            <h2 className="govuk-fieldset__heading">
              Enter details of the person this booking is for
            </h2>
          </legend>
          <form onSubmit={(event) => handleSubmit(event)}>
            <div style={{ marginBottom: '2rem' }}>
              <div
                className={`govuk-form-group ${!values.firstName.valid &&
                  `govuk-form-group--error`}`}
              >
                <label htmlFor="firstName" className="govuk-label">
                  First name
                </label>
                {!values.firstName.valid && (
                  <span id="event-name-error" className="govuk-error-message">
                    <span className="govuk-visually-hidden">Error:</span> Enter
                    your first name
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
                    <span className="govuk-visually-hidden">Error:</span> Enter
                    your last name
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
                  Contact email address for session owner.
                </span>
                {!values.email.valid && (
                  <span id="event-name-error" className="govuk-error-message">
                    <span className="govuk-visually-hidden">Error:</span> Enter
                    your email address
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
            </div>
            <button type="submit" className="govuk-button">
              Save and continue
            </button>
          </form>
        </fieldset>
      </div>
    </div>
  );
};

export default withRouter(BookingFormName);
