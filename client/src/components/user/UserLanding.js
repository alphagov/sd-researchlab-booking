import React from 'react';
import { useQuery } from '@apollo/react-hooks';
import { GET_BOOKED_EVENTS_BY_USER } from '../../queries';
import UserBookings from './UserBookings';

import Spinner from '../shared/Spinner';
import Error from '../../containers/Error';

const UserLanding = () => {
  const { data, loading, error } = useQuery(GET_BOOKED_EVENTS_BY_USER, {
    fetchPolicy: 'cache-and-network'
  });

  if (loading) return <Spinner />;

  if (error) return <Error error={error} />;

  const bookingLoader = () => {
    const { success, events, reason } = data.getBookedEventsUser;

    if (!success) {
      const errMsg = {
        error: {
          message: reason
        }
      };
      return <Error error={errMsg} />;
    }

    // need to filter out any null values
    // this may not happen in the future
    let allEvents = events.filter(Boolean);

    if (allEvents.length === 0) {
      return <div>No booked events</div>;
    }

    // need to sort the bookings

    return allEvents.map((booking, i) => {
      return <UserBookings booking={booking} key={booking.eventId} />;
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
      <div className="govuk-grid-row">{bookingLoader()}</div>
    </>
  );
};

export default UserLanding;
