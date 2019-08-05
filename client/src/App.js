import React from 'react';
import { BookingContextProvider } from './contexts/BookingContext';
import { UserContextProvider } from './contexts/UserContext';
import Layout from './containers/Layout';

const App = () => {
  return (
    <UserContextProvider>
      <BookingContextProvider>
        <Layout />
      </BookingContextProvider>
    </UserContextProvider>
  );
};

export default App;
