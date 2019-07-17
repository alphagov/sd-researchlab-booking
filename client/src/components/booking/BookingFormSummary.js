import React, { useContext, useState } from 'react';
import dateFns from 'date-fns';
import { Link } from '@reach/router';
import { withApollo } from 'react-apollo';

import { BookingContext } from '../../contexts/BookingContext';
import Spinner from '../shared/Spinner';
import Error from '../../containers/Error';

import { GET_RESEARCH_LABS_FREEBUSY } from '../../queries';
import { checkAvailability } from '../../utils/bookingUtils';

const initialErrorState = {
  status: false,
  error: ''
};

const BookinFormSummary = ({ client }) => {
  const [bookingValues, setBookingValues] = useContext(BookingContext);
  const [bookingState, setBookingState] = useState(false);
  const [errorState, setErrorState] = useState(initialErrorState);

  const {
    bookedDate,
    bookedAM,
    bookedPM,
    bookedFirstName,
    bookedLastName,
    bookedEmail,
    bookedDetail
  } = bookingValues;

  const bookLab = async () => {
    let researchLabs = [];

    try {
      // get the free busy dates from cache
      // potentially risky but the polling should take care of things?
      // may switch to getting from db.......
      const { getResourceResearchLab } = client.readQuery({
        query: GET_RESEARCH_LABS_FREEBUSY
      });
      researchLabs = getResourceResearchLab.labs;
    } catch (error) {
      console.log(error);
      setErrorState({ status: true, error });
      return;
    }

    console.log(researchLabs);
    console.log(bookingValues);

    // this is really a duplicate of what we should be looking at in booking dates
    //  but we should check again just in case someone else has booked
    const availableDetails = await checkAvailability(
      researchLabs,
      bookingValues
    );
    console.log(availableDetails);
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
