import React, { useContext } from 'react';

import { BookingContext } from '../../contexts/BookingContext';

import BookingFormDate from './BookingFormDate';
import BookingFormName from './BookingFormName';
import BookingFormDetails from './BookingFormDetails';

const BookingForm = () => {
  const [bookingValues, setBookingValues] = useContext(BookingContext);
  console.log(bookingValues);
  return <BookingFormDate />;
};

export default BookingForm;
