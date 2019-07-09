import React, { useContext } from 'react';
import { withRouter } from 'react-router-dom';

import { useForm } from '../../hooks/useForm';
import { BookingContext } from '../../contexts/BookingContext';

const initialState = {
  bookYear: { value: 2019, valid: true, reason: '' },
  bookMonth: { value: 2, valid: true, reason: '' },
  bookDay: { value: 1, valid: true, reason: '' }
};

const BookingFormDate = ({ history }) => {
  const [values, handleChange] = useForm(initialState);
  const [bookingValues, setBookingValues] = useContext(BookingContext);

  const handleSubmit = (event) => {
    event.preventDefault();
    const { bookDay, bookMonth, bookYear } = values;

    // need to check these dates are valid

    // if everything works ok move to next part of form
    // need to check if the date is available here

    setBookingValues({
      ...bookingValues,
      bookedDay: bookDay.value,
      bookedMonth: bookMonth.value,
      bookedYear: bookYear.value
    });

    // console.log(bookingValues);

    history.push('/book-a-research-lab/booking-name');
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
                    htmlFor="bookDay"
                  >
                    Day
                  </label>
                  <input
                    className="govuk-input govuk-date-input__input govuk-input--width-2"
                    id="bookDay"
                    name="bookDay"
                    type="number"
                    pattern="[0-9]*"
                    onChange={handleChange}
                    value={values.bookDay.value}
                  />
                </div>
              </div>
              <div className="govuk-date-input__item">
                <div className="govuk-form-group">
                  <label
                    className="govuk-label govuk-date-input__label"
                    htmlFor="bookMonth"
                  >
                    Month
                  </label>
                  <input
                    className="govuk-input govuk-date-input__input govuk-input--width-2"
                    id="bookMonth"
                    name="bookMonth"
                    type="number"
                    pattern="[0-9]*"
                    onChange={handleChange}
                    value={values.bookMonth.value}
                  />
                </div>
              </div>
              <div className="govuk-date-input__item">
                <div className="govuk-form-group">
                  <label
                    className="govuk-label govuk-date-input__label"
                    htmlFor="bookYear"
                  >
                    Year
                  </label>
                  <input
                    className="govuk-input govuk-date-input__input govuk-input--width-4"
                    id="bookYear"
                    name="bookYear"
                    type="number"
                    pattern="[0-9]*"
                    onChange={handleChange}
                    value={values.bookYear.value}
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

export default withRouter(BookingFormDate);
