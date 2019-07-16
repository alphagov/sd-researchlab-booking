import React, { useContext } from 'react';
import { useForm } from '../../hooks/useForm';
import { navigate } from '@reach/router';
import { BookingContext } from '../../contexts/BookingContext';

const initialState = {
  bookingDetail: { value: '', valid: true, reason: '' }
};

const BookingFormDetails = ({ history }) => {
  const [values, validateInputs, handleChange] = useForm(initialState);
  const [bookingValues, setBookingValues] = useContext(BookingContext);

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(values);

    const { bookingDetail } = values;
    validateInputs('bookingDetail', bookingDetail);

    if (!bookingDetail.valid) {
      console.log('not valid;');
      return;
    } else {
      // 'need to change this when we have equipment list'
      setBookingValues({
        ...bookingValues,
        bookedDetail: bookingDetail.value
        // equipment list array
      });
      navigate('/book-a-research-lab/booking-summary');
    }

    // if everything works ok move to next part of form with
    // summary of booking
    // history.push('/book-a-research-lab/booking-details');
  };
  return (
    <div className="govuk-grid-row">
      <div className="govuk-grid-column-full">
        <div className="govuk-form-group">
          <fieldset className="govuk-fieldset">
            <legend className="govuk-fieldset__legend govuk-fieldset__legend--l">
              <h2 className="govuk-fieldset__heading">
                Enter a brief description of the research session
              </h2>
            </legend>
            <form onSubmit={(event) => handleSubmit(event)}>
              <div style={{ marginBottom: '2rem' }}>
                <div
                  className={`govuk-form-group ${!values.bookingDetail.valid &&
                    `govuk-form-group--error`}`}
                >
                  <label className="govuk-label" htmlFor="bookingDetail">
                    Can you provide some detail?
                  </label>
                  <span id="more-detail-hint" className="govuk-hint">
                    Do not include personal information.
                  </span>
                  {!values.bookingDetail.valid && (
                    <span
                      id="more-detail-error"
                      className="govuk-error-message"
                    >
                      <span className="govuk-visually-hidden">Error:</span>{' '}
                      {values.bookingDetail.reason}
                    </span>
                  )}

                  <textarea
                    className="govuk-textarea"
                    id="bookingDetail"
                    name="bookingDetail"
                    rows="5"
                    aria-describedby="more-detail-hint"
                    onChange={handleChange}
                    value={values.bookingDetail.value}
                  />
                </div>
              </div>
              <button type="submit" className="govuk-button">
                Book the lab
              </button>
            </form>
          </fieldset>
        </div>
      </div>
    </div>
  );
};

export default BookingFormDetails;
