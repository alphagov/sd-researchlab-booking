import React, { useContext } from 'react';
import { useForm } from '../../hooks/useForm';
import { BookingContext } from '../../contexts/BookingContext';
import { withRouter } from 'react-router-dom';

const initialState = {
  bookYear: { value: 2019, valid: true, reason: '' },
  bookMonth: { value: 2, valid: true, reason: '' },
  bookDay: { value: 1, valid: true, reason: '' },
  bookAM: { value: false, valid: true, reason: '' },
  bookPM: { value: false, valid: true, reason: '' }
};

const BookingFormDate = ({ history }) => {
  const [values, validateInputs, handleChange] = useForm(initialState);
  const [bookingValues, setBookingValues] = useContext(BookingContext);

  console.log(values);

  const handleSubmit = (event) => {
    event.preventDefault();
    const { bookDay, bookMonth, bookYear, bookAM, bookPM } = values;

    // need to check these dates are valid

    // if everything works ok move to next part of form
    // need to check if the date is available here

    setBookingValues({
      ...bookingValues,
      bookedDay: bookDay,
      bookedMonth: bookMonth,
      bookedYear: bookYear,
      bookedAM: bookAM,
      bookedPM: bookPM,
      bookedDate: true
    });
  };

  return (
    <div className="govuk-grid-column-full">
      <form onSubmit={(event) => handleSubmit(event)}>
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
          </fieldset>
        </div>

        <div className="govuk-form-group">
          <fieldset className="govuk-fieldset" aria-describedby="waste-hint">
            <legend className="govuk-fieldset__legend govuk-fieldset__legend--l">
              <h2 className="govuk-fieldset__heading">
                What part(s) of the day would you like to book
              </h2>
            </legend>
            <span id="waste-hint" className="govuk-hint">
              Select both AM and PM if you need the whole day
            </span>
            <div className="govuk-checkboxes">
              <div className="govuk-checkboxes__item">
                <input
                  className="govuk-checkboxes__input"
                  id="bookAM"
                  name="bookAM"
                  type="checkbox"
                  value={values.bookAM.value}
                  onChange={handleChange}
                />
                <label
                  className="govuk-label govuk-checkboxes__label"
                  htmlFor="am"
                >
                  AM from 08:30 to 12:00
                </label>
              </div>
              <div className="govuk-checkboxes__item">
                <input
                  className="govuk-checkboxes__input"
                  id="bookPM"
                  name="bookPM"
                  type="checkbox"
                  value={values.bookPM.value}
                  onChange={handleChange}
                />
                <label
                  className="govuk-label govuk-checkboxes__label"
                  htmlFor="pm"
                >
                  PM from 12:00 to 17:30
                </label>
              </div>
            </div>
          </fieldset>
        </div>
        <button type="submit" className="govuk-button">
          Save and continue
        </button>
      </form>
    </div>
  );
};

export default withRouter(BookingFormDate);
