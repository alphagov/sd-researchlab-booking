import React, { useContext } from 'react';
import { useQuery } from '@apollo/react-hooks';
import { GET_BOOKED_EVENTS_BY_USER } from '../../queries';
import UserBookings from './UserBookings';

import { UserContext } from '../../contexts/UserContext';

import Spinner from '../shared/Spinner';
import Error from '../../containers/Error';

import { bookingInfoLayout } from '../../utils/layoutUtils';

const UserLanding = () => {
  const { data, loading, error } = useQuery(GET_BOOKED_EVENTS_BY_USER, {
    fetchPolicy: 'cache-and-network'
  });
  // eslint-disable-next-line no-unused-vars
  const [userValues, setUserValues] = useContext(UserContext);

  if (loading) return <Spinner />;

  if (error) return <Error error={error} />;

  let allEvents;

  if (data && data.getBookedEventsUser) {
    const { success, events } = data.getBookedEventsUser;
    if (!success) {
      setUserValues({ isLoggedIn: false });
    }

    allEvents = events.filter(Boolean);
  }

  const bookingLoader = (status) => {
    const statusEvents = allEvents.filter(
      (event) => event.eventStatus === status
    );

    if (statusEvents.length === 0) {
      return (
        <div className="govuk-warning-text">
          <span className="govuk-warning-text__icon" aria-hidden="true">
            !
          </span>
          <strong className="govuk-warning-text__text">
            <span className="govuk-warning-text__assistive">Information</span>
            {`No ${status} bookings`}
          </strong>
        </div>
      );
    }

    // need to sort the bookings
    statusEvents.sort((a, b) => b.eventStart.localeCompare(a.eventStart));

    const eventsArray = bookingInfoLayout(statusEvents);

    return eventsArray.map((row, i) => {
      return (
        <div className="govuk-grid-row" key={i}>
          {row.map((booking) => {
            if (booking === undefined) {
              return '';
            }
            return <UserBookings booking={booking} key={booking.eventId} />;
          })}
        </div>
      );
    });
  };

  console.log(data);

  return (
    <>
      <div className="govuk-grid-row">
        <div className="govuk-grid-column-full">
          <h2 className="govuk-heading-l">Booking information</h2>
        </div>
      </div>
      <div className="govuk-grid-row">
        <div className="govuk-grid-column-full">
          <h3 className="govuk-heading-m">Confirmed Bookings</h3>
        </div>
      </div>
      {bookingLoader('confirmed')}
      <div className="govuk-grid-row">
        <div className="govuk-grid-column-full">
          <h3 className="govuk-heading-m">Tentative Bookings</h3>
        </div>
      </div>
      {bookingLoader('tentative')}
      <div className="govuk-grid-row">
        <div className="govuk-grid-column-full">
          <h3 className="govuk-heading-m">Cancelled Bookings</h3>
        </div>
      </div>
      {bookingLoader('cancelled')}
    </>
  );
};

export default UserLanding;
