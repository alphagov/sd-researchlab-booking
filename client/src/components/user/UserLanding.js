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

    const numBookings = allEvents.length;

    if (numBookings === 0) {
      return <div>No booked events</div>;
    }

    // need to sort the bookings
    //  also need to sort the layout here 2 columns in each row

    const numRows = Math.ceil(numBookings / 2);

    let rowArray = new Array(numRows);

    for (let i = 0; i < numRows; i++) {
      rowArray[i] = [];
    }

    let h = 0;

    for (let i = 0; i < numRows; i++) {
      for (let j = 0; j < numRows; j++) {
        rowArray[i][j] = allEvents[h++];
      }
    }

    console.log('[rowArray]', rowArray);

    // for (let i = 0; i < numRows; i++) {
    //   console.log(rowArray[i]);
    //   return (
    //     <div className="govuk-grid-row">
    //       Hello {i}
    //       {/* {rowArray[i].map((booking) => (

    //       ))} */}
    //     </div>
    //   );
    // }

    return rowArray.map((row, i) => {
      return (
        <div className="govuk-grid-row" key={i}>
          {row.map((booking) => {
            return <UserBookings booking={booking} key={booking.eventId} />;
          })}
          <hr className="govuk-section-break govuk-section-break--visible" />
        </div>
      );
    });

    // return allEvents.map((booking, i) => {
    //   return <UserBookings booking={booking} key={booking.eventId} />;
    // });
  };

  console.log(data);

  return (
    <>
      <div className="govuk-grid-row">
        <div className="govuk-grid-column-full">
          <h2 className="govuk-heading-l">Booking information</h2>
        </div>
      </div>
      {bookingLoader()}
    </>
  );
};

export default UserLanding;
