/* eslint-disable no-unused-vars */
import React, { useContext } from 'react';
import dateFns from 'date-fns';
import { navigate } from '@reach/router';
import { useQuery } from '@apollo/react-hooks';

import { yearBuilder } from '../../utils/dateUtils';
import { checkClashDates, checkBookingSlots } from '../../utils/bookingUtils';
import { useForm } from '../../hooks/useForm';
import { BookingContext } from '../../contexts/BookingContext';
import { UserContext } from '../../contexts/UserContext';
import { GET_RESEARCH_LABS_FREEBUSY } from '../../queries';

let initDate = dateFns.addDays(new Date(), 2);

while (dateFns.isWeekend(initDate)) {
  initDate = dateFns.addDays(initDate, 1);
}

const initialState = {
  bookYear: { value: dateFns.getYear(initDate), valid: true, reason: '' },
  bookMonth: {
    value: dateFns.getMonth(initDate) + 1,
    valid: true,
    reason: ''
  },
  bookDay: {
    value: dateFns.getDate(initDate),
    valid: true,
    reason: ''
  },
  bookDate: { value: initDate, valid: true, reason: '' },
  bookAM: { value: false, valid: true, reason: '' },
  bookPM: { value: false, valid: true, reason: '' },
  bookAMPM: { value: false, valid: true, reason: '' }
};

const BookingFormDate = () => {
  const [values, validateInputs, handleChange] = useForm(initialState);
  const [bookingValues, setBookingValues] = useContext(BookingContext);
  const [userValues, setUserValues] = useContext(UserContext);
  const { data } = useQuery(GET_RESEARCH_LABS_FREEBUSY, {
    fetchPolicy: 'cache-and-network'
  });

  if (data && data.getResourceResearchLab) {
    if (!data.getResourceResearchLab.success) {
      setUserValues({ isLoggedIn: false });
    }
  }

  const checkAvail = async (details) => {
    const { labs } = data.getResourceResearchLab;

    const bookedLabs = await checkClashDates(labs, details);

    // send it off to validate inputs

    const checkBooking = {
      ...details,
      labs,
      bookedLabs
    };

    // console.log(checkBooking);

    const availability = await checkBookingSlots(checkBooking);
    // console.log(availability);
    return availability;
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const {
      bookDay,
      bookMonth,
      bookYear,
      bookAM,
      bookPM,
      bookDate,
      bookAMPM
    } = values;
    // need to check these dates are valid
    bookDate.value = yearBuilder(
      bookDay.value,
      bookMonth.value,
      bookYear.value
    );

    validateInputs('bookDate', bookDate);
    validateInputs('bookAMPM', { bookAM, bookPM });

    // need to check if the date is available here
    checkAvail({
      bookedDate: bookDate.value,
      bookedAM: bookAM.value,
      bookedPM: bookPM.value
    }).then((result) => {
      // console.log(result);
      if (!result.available) {
        bookDate.valid = false;
        bookDate.reason = 'Sorry but that date is booked';
        validateInputs('bookingSlots', {
          value: bookDate.value,
          valid: bookDate.valid,
          reason: bookDate.reason
        });
      }

      if (!bookDate.valid || !bookAMPM.valid) {
        console.log('not valid');
        return;
      } else {
        setBookingValues({
          ...bookingValues,
          bookedDay: bookDay.value,
          bookedMonth: bookMonth.value,
          bookedYear: bookYear.value,
          bookedAM: bookAM.value,
          bookedPM: bookPM.value,
          bookedDate: bookDate.value
        });

        // if everything works ok move to next part of form
        navigate('/book-a-research-lab/booking-name');
      }
    });
  };

  return (
    <div className="govuk-grid-row">
      <div className="govuk-grid-column-full">
        <form onSubmit={(event) => handleSubmit(event)}>
          <div
            className={`govuk-form-group 
           ${!values.bookDate.valid && `govuk-form-group--error`}  `}
          >
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
              {!values.bookDate.valid && (
                <span id="date-error" className="govuk-error-message">
                  <span className="govuk-visually-hidden">Error:</span>{' '}
                  {values.bookDate.reason}
                </span>
              )}
              <div className="govuk-date-input" id="booked-date">
                <div className="govuk-date-input__item">
                  <div
                    className={`govuk-form-group ${!values.bookDay.valid &&
                      `govuk-form-group--error`}`}
                  >
                    <label
                      className="govuk-label govuk-date-input__label"
                      htmlFor="bookDay"
                    >
                      Day
                    </label>
                    {!values.bookDay.valid && (
                      <span
                        id="event-name-error"
                        className="govuk-error-message"
                      >
                        <span className="govuk-visually-hidden">Error:</span>
                        Day must be between 1 and 31
                      </span>
                    )}
                    <input
                      className={`govuk-input govuk-date-input__input govuk-input--width-2 ${(!values
                        .bookDay.valid ||
                        !values.bookDate.valid) &&
                        `govuk-input--error`}`}
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
                  <div
                    className={`govuk-form-group ${!values.bookMonth.valid &&
                      `govuk-form-group--error`}`}
                  >
                    <label
                      className="govuk-label govuk-date-input__label"
                      htmlFor="bookMonth"
                    >
                      Month
                    </label>
                    {!values.bookMonth.valid && (
                      <span
                        id="event-name-error"
                        className="govuk-error-message"
                      >
                        <span className="govuk-visually-hidden">Error:</span>
                        Month must be between 1 and 12
                      </span>
                    )}
                    <input
                      className={`govuk-input govuk-date-input__input govuk-input--width-2 ${(!values
                        .bookMonth.valid ||
                        !values.bookDate.valid) &&
                        `govuk-input--error`}`}
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
                  <div
                    className={`govuk-form-group ${!values.bookYear.valid &&
                      `govuk-form-group--error`}`}
                  >
                    <label
                      className="govuk-label govuk-date-input__label"
                      htmlFor="bookYear"
                    >
                      Year
                    </label>
                    {!values.bookYear.valid && (
                      <span
                        id="event-name-error"
                        className="govuk-error-message"
                      >
                        <span className="govuk-visually-hidden">Error:</span>
                        Year must be in the format YYYY and cannot be in the
                        past
                      </span>
                    )}
                    <input
                      className={`govuk-input govuk-date-input__input govuk-input--width-4 ${(!values
                        .bookYear.valid ||
                        !values.bookDate.valid) &&
                        `govuk-input--error`}`}
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
          <div
            className={`govuk-form-group ${!values.bookAMPM.valid &&
              `govuk-form-group--error`}`}
          >
            <fieldset
              className="govuk-fieldset"
              aria-describedby="am-or-pm-hint am-pm-error"
            >
              <legend className="govuk-fieldset__legend govuk-fieldset__legend--l">
                <h2 className="govuk-fieldset__heading">
                  What part(s) of the day would you like to book
                </h2>
              </legend>
              <span id="date-hint" className="govuk-hint">
                Select both AM and PM if you need the whole day
              </span>
              {!values.bookAMPM.valid && (
                <span id="am-pm-error" className="govuk-error-message">
                  <span className="govuk-visually-hidden">Error:</span> Select
                  either AM or PM or both if you need the whole day
                </span>
              )}
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
                    AM
                  </label>
                  <span
                    id="am-item-hint"
                    className="govuk-hint govuk-checkboxes__hint"
                  >
                    from 08:30 to 12:00
                  </span>
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
                    PM
                  </label>
                  <span
                    id="pm-item-hint"
                    className="govuk-hint govuk-checkboxes__hint"
                  >
                    from 12:30 to 17:00
                  </span>
                </div>
              </div>
            </fieldset>
          </div>
          <button type="submit" className="govuk-button">
            Save and continue
          </button>
        </form>
      </div>
    </div>
  );
};

export default BookingFormDate;
