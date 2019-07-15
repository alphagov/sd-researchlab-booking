import React, { useContext } from 'react';

import { BookingContext } from '../../contexts/BookingContext';

import BookingFormDate from './BookingFormDate';

const BookingForm = () => {
  // const [bookingValues] = useContext(BookingContext);
  // console.log(bookingValues);
  return <BookingFormDate />;
};

export default BookingForm;
