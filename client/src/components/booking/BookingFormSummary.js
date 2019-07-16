import React, { useContext } from 'react';
import dateFns from 'date-fns';
import { Link } from '@reach/router';

import { BookingContext } from '../../contexts/BookingContext';

const BookinFormSummary = () => {
  const [bookingValues, setBookingValues] = useContext(BookingContext);
  console.log(bookingValues);
  const {
    bookedDate,
    bookedAM,
    bookedPM,
    bookedFirstName,
    bookedLastName,
    bookedEmail,
    bookedDetail
  } = bookingValues;

  return (
    <div>
      <dl className="govuk-summary-list">
        <div className="govuk-summary-list__row">
          <dt className="govuk-summary-list__key">Date</dt>
          <dd className="govuk-summary-list__value">
            {dateFns.format(bookedDate, 'dddd Do MMM YYYY')}
          </dd>
          <dd className="govuk-summary-list__actions">
            <Link className="govuk-link" to="/book-a-research-lab/booking-date">
              Change<span className="govuk-visually-hidden"> date</span>
            </Link>
          </dd>
        </div>

        <div className="govuk-summary-list__row">
          <dt className="govuk-summary-list__key">Session</dt>
          <dd className="govuk-summary-list__value">
            {bookedAM && bookedPM && `All day 08:30 - 17:00`}
            {bookedAM && !bookedPM && 'AM 08:30 - 12:00'}
            {!bookedAM && bookedPM && 'PM 12:30 - 17:00'}
          </dd>
          <dd className="govuk-summary-list__actions">
            <Link className="govuk-link" to="/book-a-research-lab/booking-date">
              Change
              <span className="govuk-visually-hidden"> session</span>
            </Link>
          </dd>
        </div>

        <div className="govuk-summary-list__row">
          <dt className="govuk-summary-list__key">Contact information</dt>
          <dd className="govuk-summary-list__value">
            {bookedFirstName} {bookedLastName}
            <br />
            {bookedEmail}
          </dd>
          <dd className="govuk-summary-list__actions">
            <Link className="govuk-link" to="/book-a-research-lab/booking-name">
              Change
              <span className="govuk-visually-hidden">contact information</span>
            </Link>
          </dd>
        </div>

        <div className="govuk-summary-list__row">
          <dt className="govuk-summary-list__key">Booking details</dt>
          <dd className="govuk-summary-list__value">
            <p className="govuk-body">{bookedDetail}</p>
          </dd>
          <dd className="govuk-summary-list__actions">
            <a className="govuk-link" href="/">
              Change
              <span className="govuk-visually-hidden"> booking details</span>
            </a>
          </dd>
        </div>
      </dl>
    </div>
  );
};

export default BookinFormSummary;
