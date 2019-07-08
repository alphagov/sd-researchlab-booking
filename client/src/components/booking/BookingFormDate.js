import React from 'react';

const BookingFormDate = () => {
  const handleSubmit = (event) => {
    event.preventDefault();
    // console.log(values);
    // if everything works ok move to next part of form
  };

  return (
    <div className="govuk-grid-column-full">
      <div className="govuk-form-group">
        <fieldset
          className="govuk-fieldset"
          aria-describedby="booked-date-hint"
          role="group"
        >
          <legend className="govuk-fieldset__legend govuk-fieldset__legend--l">
            <h2 className="govuk-fieldset__heading">
              What date would you like to book?
            </h2>
          </legend>
          <span id="booked-date-hint" className="govuk-hint">
            For example, 25 11 2019
          </span>
          <form onSubmit={(event) => handleSubmit(event)}>
            <div
              className="govuk-date-input"
              id="booked-date"
              style={{ marginBottom: '2rem' }}
            >
              <div className="govuk-date-input__item">
                <div className="govuk-form-group">
                  <label
                    className="govuk-label govuk-date-input__label"
                    htmlFor="booked-date-day"
                  >
                    Day
                  </label>
                  <input
                    className="govuk-input govuk-date-input__input govuk-input--width-2"
                    id="booked-date-day"
                    name="booked-date-day"
                    type="number"
                    pattern="[0-9]*"
                  />
                </div>
              </div>
              <div className="govuk-date-input__item">
                <div className="govuk-form-group">
                  <label
                    className="govuk-label govuk-date-input__label"
                    htmlFor="booked-date-month"
                  >
                    Month
                  </label>
                  <input
                    className="govuk-input govuk-date-input__input govuk-input--width-2"
                    id="booked-date-month"
                    name="booked-date-month"
                    type="number"
                    pattern="[0-9]*"
                  />
                </div>
              </div>
              <div className="govuk-date-input__item">
                <div className="govuk-form-group">
                  <label
                    className="govuk-label govuk-date-input__label"
                    htmlFor="booked-date-year"
                  >
                    Year
                  </label>
                  <input
                    className="govuk-input govuk-date-input__input govuk-input--width-4"
                    id="booked-date-year"
                    name="booked-date-year"
                    type="number"
                    pattern="[0-9]*"
                  />
                  >
                </div>
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

export default BookingFormDate;
