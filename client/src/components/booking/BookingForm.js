import React, { useContext } from 'react';
import { Route } from 'react-router-dom';

import { BookingContext } from '../../contexts/BookingContext';
import BookingFormName from './BookingFormName';
import BookingFormDetails from './BookingFormDetails';

import BookingFormDate from './BookingFormDate';

const BookingForm = () => {
  // const [bookingValues] = useContext(BookingContext);
  // console.log(bookingValues);
  return (
    <>
      <BookingFormDate />
      <Route
        exact
        path="/book-a-research-lab/booking-name"
        component={BookingFormName}
      />
      <Route
        path="/book-a-research-lab/booking-details"
        component={BookingFormDetails}
      />
    </>
  );
};

export default BookingForm;
