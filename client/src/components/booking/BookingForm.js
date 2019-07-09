import React, { useContext } from 'react';

import { BookingContext } from '../../contexts/BookingContext';

import BookingFormDate from './BookingFormDate';
import BookingFormName from './BookingFormName';
import BookingFormDetails from './BookingFormDetails';

const BookingForm = () => {
  const [bookingValues, setBookingValues] = useContext(BookingContext);
  console.log(bookingValues);
  const { bookedDate, bookedName, bookedDetails } = bookingValues;
  return <div>{bookedDate ? <BookingFormName /> : <BookingFormDate />}</div>;
};

export default BookingForm;
