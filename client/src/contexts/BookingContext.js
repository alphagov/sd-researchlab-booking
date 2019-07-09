import React, { createContext, useState } from 'react';

const BookingContext = createContext([{}, () => {}]);

const BookingContextProvider = ({ children }) => {
  const [bookingValues, setBookingValues] = useState({});
  return (
    <BookingContext.Provider value={[bookingValues, setBookingValues]}>
      {children}
    </BookingContext.Provider>
  );
};

export { BookingContext, BookingContextProvider };
