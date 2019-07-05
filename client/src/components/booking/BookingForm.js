import React from 'react';
import { useForm } from '../../hooks/useForm';

const initialState = {
  firstName: { value: '', valid: true, reason: '' }
};

const BookingForm = () => {
  const [values, handleChange] = useForm(initialState);

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(values);
  };

  return (
    <div className="govuk-grid-column-two-thirds">
      <h2 className="govuk-heading-l">Lab booking form</h2>
      <fieldset className="govuk-fieldset">
        <legend className="govuk-fieldset__legend govuk-fieldset__legend--m">
          <h3 className="govuk-fieldset__heading">Enter your details</h3>
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
        </form>
      </fieldset>
    </div>
  );
};

export default BookingForm;
