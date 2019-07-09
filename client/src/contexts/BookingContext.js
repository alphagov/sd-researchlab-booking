import React, { createContext, useState } from 'react';

const initialValues = {
  bookedFirstName: '',
  bookedLastName: '',
  bookedEmail: '',
  bookedDay: 0,
  bookedMonth: 0,
  bookedYear: 0,
  bookedDetails: ''
};

const BookingContext = createContext([{}, () => {}]);

const BookingContextProvider = ({ children }) => {
  const [bookingValues, setBookingValues] = useState(initialValues);
  console.log(bookingValues);
  return (
    <BookingContext.Provider value={[bookingValues, setBookingValues]}>
      {children}
    </BookingContext.Provider>
  );
};

export { BookingContext, BookingContextProvider };
