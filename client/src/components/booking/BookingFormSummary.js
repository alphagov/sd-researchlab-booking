import React, { useContext, useState } from 'react';
import dateFns from 'date-fns';
import { Link } from '@reach/router';
import { withApollo } from 'react-apollo';
// import gql from 'graphql-tag';

import { BookingContext } from '../../contexts/BookingContext';
import Spinner from '../shared/Spinner';
import Error from '../../containers/Error';

import { GET_RESEARCH_LABS, GET_CALENDAR_FREE_BUSY } from '../../queries';

const initialErrorState = {
  status: false,
  error: ''
};

const BookinFormSummary = ({ client }) => {
  const [bookingValues, setBookingValues] = useContext(BookingContext);
  const [bookingState, setBookingState] = useState(false);
  const [errorState, setErrorState] = useState(initialErrorState);
  // console.log(bookingValues);

  const {
    bookedDate,
    bookedAM,
    bookedPM,
    bookedFirstName,
    bookedLastName,
    bookedEmail,
    bookedDetail
  } = bookingValues;

  const bookLab = () => {
    console.log(bookingValues);
    let items;

    try {
      // get the calendar list from the cache
      const { getResourceCalendarList } = client.readQuery({
        query: GET_RESEARCH_LABS
      });
      console.log(getResourceCalendarList.calendars);
      items = getResourceCalendarList.calendars.map(
        (calendar) => calendar.resourceEmail
      );
    } catch (error) {
      console.log(error);
      setErrorState({ status: true, error });
      return;
    }

    // get the free busy dates from cache
    // potentially risky but the polling should take care of things?
    // may switch to getting from db.......
    // this is really a duplicate of what we should be looking at in booking dates
    try {
      const start = dateFns.startOfDay(new Date());
      // google only give 2 months of free/busy so get 2 months from todays date
      const end = dateFns.endOfDay(dateFns.addMonths(start, 2));

      const { getCalendarFreeBusyList } = client.readQuery({
        query: GET_CALENDAR_FREE_BUSY,
        variables: {}
      });
      console.log(getCalendarFreeBusyList);
    } catch (error) {
      console.log(error);
      setErrorState({ status: true, error });
      return;
    }

    // book the lab
    // show confirmation
    setBookingState(true);
    // then navigate to user area
  };

  return (
    <>
      <div className="govuk-grid-row">
        <div className="govuk-grid-column-full">
          <h3 className="govuk-heading-m">Booking summary</h3>
        </div>
      </div>
      <div className="govuk-grid-row">
        <div className="govuk-grid-column-full">
          <dl className="govuk-summary-list">
            <div className="govuk-summary-list__row">
              <dt className="govuk-summary-list__key">Date</dt>
              <dd className="govuk-summary-list__value">
                {dateFns.format(bookedDate, 'dddd Do MMM YYYY')}
              </dd>
              <dd className="govuk-summary-list__actions">
                <Link
                  className="govuk-link"
                  to="/book-a-research-lab/booking-date"
                >
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
                <Link
                  className="govuk-link"
                  to="/book-a-research-lab/booking-date"
                >
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
                <Link
                  className="govuk-link"
                  to="/book-a-research-lab/booking-name"
                >
                  Change
                  <span className="govuk-visually-hidden">
                    contact information
                  </span>
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
                  <span className="govuk-visually-hidden">
                    {' '}
                    booking details
                  </span>
                </a>
              </dd>
            </div>
          </dl>
        </div>
      </div>
      <div className="govuk-grid-row">
        <div className="govuk-grid-column-full">
          {errorState.status && <Error error={errorState.error} />}
          {bookingState ? (
            <div className="govuk-inset-text">
              Your booking request has been submitted. This is a tentative
              booking. The GDS research team will either confirm or deny the
              booking within 48hrs.
            </div>
          ) : (
            <button type="submit" className="govuk-button" onClick={bookLab}>
              Book the lab
            </button>
          )}
        </div>
      </div>
    </>
  );
};

export default withApollo(BookinFormSummary);
