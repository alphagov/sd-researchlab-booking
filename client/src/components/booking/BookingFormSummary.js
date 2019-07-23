import React, { useContext, useState } from 'react';
import dateFns from 'date-fns';
import { Link } from '@reach/router';
import { withApollo } from 'react-apollo';
import { useMutation } from 'react-apollo-hooks';

import { BookingContext } from '../../contexts/BookingContext';
import Spinner from '../shared/Spinner';
import Error from '../../containers/Error';

import { makeStartEnd } from '../../utils/dateUtils';

import { GET_RESEARCH_LABS_FREEBUSY, BOOK_LAB_SLOT } from '../../queries';
import { checkClashDates, checkBookingSlots } from '../../utils/bookingUtils';

const initialErrorState = {
  status: false,
  error: ''
};

const BookinFormSummary = ({ client }) => {
  const [bookingValues, setBookingValues] = useContext(BookingContext);
  const [bookingState, setBookingState] = useState(false);
  const [errorState, setErrorState] = useState(initialErrorState);
  const [addBooking] = useMutation(BOOK_LAB_SLOT);

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

  const bookLab = async () => {
    let researchLabs = [];
    // const { bookedAM, bookedPM, bookedDate } = bookingValues;

    try {
      const { data, loading, error } = await client.query({
        query: GET_RESEARCH_LABS_FREEBUSY,
        fetchPolicy: 'network-only'
      });

      if (loading) {
        return <Spinner />;
      }
      if (error) {
        return setErrorState({ status: true, error });
      }
      researchLabs = data.getResourceResearchLab.labs;
    } catch (error) {
      console.log(error);
      setErrorState({ status: true, error });
      return;
    }

    console.log(researchLabs);

    // this is really a duplicate of what we should be looking at in booking dates
    //  but we should check again just in case someone else has booked
    const bookedLabs = await checkClashDates(researchLabs, bookingValues);
    console.log(bookedLabs);

    const checkBooking = {
      bookedAM,
      bookedPM,
      bookedDate,
      researchLabs,
      bookedLabs
    };

    const availability = await checkBookingSlots(checkBooking);

    console.log(availability);

    if (!availability.available) {
      let error = {};
      error.message =
        'I am sorry but that date and slot has now been booked by someone else';

      console.log(error);
      setErrorState({ status: true, error });
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

    try {
      bookingResult = await addBooking({
        variables: {
          calendarId: availability.resourceEmail,
          start: slots.start,
          end: slots.end,
          attendees: parseInt(bookedAttend),
          title: `not done this`,
          description: `${bookedDetail} equipment required ${bookedEquipment}`,
          creator: `${bookedFirstName} ${bookedLastName}`,
          email: bookedEmail
        }
      });
    } catch (error) {
      console.log(error);
      setErrorState({ status: true, error });
    }

    console.log(bookingResult.data);
    // show confirmation
    // if (bookingResult.success) {
    //   console.log(bookingResult.event);
    //   setBookingState(true);
    //   // then navigate to user area
    // }
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
