import React, { createContext, useState } from 'react';

const initialValues = {
  firstName: '',
  lastName: '',
  email: '',
  bookday: '',
  bookMonth: '',
  bookYear: '',
  bookDetails: ''
};

const BookingContext = createContext([initialValues, () => {}]);

const BookingContextProvider = ({ children }) => {
  const [bookingValues, setBookingValues] = useState(initialValues);
  return (
    <BookingContext.Provider value={[bookingValues, setBookingValues]}>
      {children}
    </BookingContext.Provider>
  );
};

export { BookingContext, BookingContextProvider };
