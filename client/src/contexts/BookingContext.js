import React, { createContext, useState } from 'react';

const initialValues = {};

const BookingContext = createContext([{}, () => {}]);

const BookingContextProvider = ({ children }) => {
  const [bookingValues, setBookingValues] = useState(initialValues);
  return (
    <BookingContext.Provider value={[bookingValues, setBookingValues]}>
      {children}
    </BookingContext.Provider>
  );
};

export { BookingContext, BookingContextProvider };
