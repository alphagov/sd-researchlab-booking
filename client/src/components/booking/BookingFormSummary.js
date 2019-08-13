import React, { useContext, useState } from 'react';
import dateFns from 'date-fns';
import { Link, navigate } from '@reach/router';
import { useMutation, useQuery } from '@apollo/react-hooks';

import { BookingContext } from '../../contexts/BookingContext';
import { UserContext } from '../../contexts/UserContext';
import Spinner from '../shared/Spinner';
import Error from '../../containers/Error';

import { makeStartEnd } from '../../utils/dateUtils';

import { GET_RESEARCH_LABS_FREEBUSY, BOOK_LAB_SLOT } from '../../queries';
import { checkClashDates, checkBookingSlots } from '../../utils/bookingUtils';

const initialErrorState = {
  status: false,
  error: ''
};

const BookinFormSummary = () => {
  const [bookingValues, setBookingValues] = useContext(BookingContext);
  // eslint-disable-next-line no-unused-vars
  const [userValues, setUserValues] = useContext(UserContext);
  const [bookingState, setBookingState] = useState({
    booked: false,
    event: {}
  });
  const [errorState, setErrorState] = useState(initialErrorState);
  const [addBooking, { loading }] = useMutation(BOOK_LAB_SLOT);
  const { data } = useQuery(GET_RESEARCH_LABS_FREEBUSY, {
    fetchPolicy: 'network-only'
  });

  const {
    bookedDate,
    bookedAM,
    bookedPM,
    bookedFirstName,
    bookedLastName,
    bookedEmail,
    bookedDetail,
    bookedAttend,
    bookedEquipment
  } = bookingValues;

  if (data && data.getResourceResearchLab) {
    if (!data.getResourceResearchLab.success) {
      setUserValues({ isLoggedIn: false });
    }
  }

  const bookLab = async () => {
    const { labs } = data.getResourceResearchLab;

    console.log(labs);

    // this is really a duplicate of what we should be looking at in booking dates
    //  but we should check again just in case someone else has booked
    const bookedLabs = await checkClashDates(labs, bookingValues);

    const checkBooking = {
      bookedAM,
      bookedPM,
      bookedDate,
      labs,
      bookedLabs
    };

    const availability = await checkBookingSlots(checkBooking);

    if (!availability.available) {
      let error = {};
      error.message =
        'I am sorry but that date and slot has now been booked by someone else';

      console.log(error);
      setErrorState({ status: true, error });
      setBookingState({
        ...bookingState
      });
      return;
    }

    let slots = {};

    if (bookedAM && !bookedPM) {
      slots = makeStartEnd(bookedDate, 'AM');
    }

    if (!bookedAM && bookedPM) {
      slots = makeStartEnd(bookedDate, 'PM');
    }

    if (bookedAM && bookedPM) {
      slots = makeStartEnd(bookedDate, 'DAY');
    }

    // book the lab
    let bookingResult;

    console.log('bookedAttend', bookedAttend);

    try {
      bookingResult = await addBooking({
        variables: {
          calendarId: availability.resourceEmail,
          start: slots.start,
          end: slots.end,
          numAttendees: parseInt(bookedAttend),
          title: `Research Lab Booking for ${bookedFirstName} ${bookedLastName}`,
          description: bookedDetail,
          creator: `${bookedFirstName} ${bookedLastName}`,
          email: bookedEmail,
          equipment: bookedEquipment,
          guests: bookedAttend
        }
      });
    } catch (error) {
      console.log(error);
      setErrorState({ status: true, error });
      setBookingState({
        ...bookingState
      });
    }

    const { success, event } = bookingResult.data.addResearchLabEvent;

    if (success) {
      console.log(event);
      // add to the booking context setBookingValues
      setBookingValues({
        ...bookingValues,
        bookedEvent: event
      });
      setBookingState({
        booked: true,
        event: event
      });
      // then navigate to user area
      setTimeout(() => {
        navigate('/user/user-home');
      }, 10000);
    }
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
                <p className="govuk-body">
                  {bookedAttend} people will be attending
                </p>
                <p className="govuk-body">{bookedDetail}</p>
                {bookedEquipment && (
                  <>
                    <p className="govuk-body">
                      The following equipment will be needed:
                    </p>

                    <ul className="govuk-list govuk-list--bullet">
                      {bookedEquipment.map((equip, i) => (
                        <li key={i}>{equip}</li>
                      ))}
                    </ul>
                  </>
                )}
              </dd>
              <dd className="govuk-summary-list__actions">
                <a className="govuk-link" href="/">
                  Change
                  <span className="govuk-visually-hidden">booking details</span>
                </a>
              </dd>
            </div>
          </dl>
        </div>
      </div>
      <div className="govuk-grid-row">
        <div className="govuk-grid-column-full">
          {errorState.status && <Error error={errorState.error} />}
          {bookingState.booked && (
            <div className="govuk-panel govuk-panel--confirmation">
              <h1 className="govuk-panel__title">Booking complete</h1>
              <div className="govuk-panel__body">
                Your booking reference number is:
                <br />
                <strong>{bookingState.event.eventId}</strong>
              </div>
            </div>
          )}
          {loading ? (
            <Spinner />
          ) : (
            <button
              type="submit"
              className="govuk-button"
              onClick={bookLab}
              disabled={bookingState.booked}
            >
              Book the lab
            </button>
          )}
        </div>
      </div>
    </>
  );
};

export default BookinFormSummary;
