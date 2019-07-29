import React from 'react';
import { BookingContextProvider } from './contexts/BookingContext';
import Layout from './containers/Layout';

const App = () => {
  return (
    <BookingContextProvider>
      <Layout />
    </BookingContextProvider>
  );
};

export default App;
