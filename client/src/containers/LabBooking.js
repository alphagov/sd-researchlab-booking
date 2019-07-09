import React from 'react';
import { BookingContextProvider } from '../contexts/BookingContext';

import LabCalendarList from '../components/calendars/LabCalendarList';
import BookingForm from '../components/booking/BookingForm';

const LabBooking = () => {
  return (
    <>
      <div className="govuk-grid-row">
        <div className="govuk-grid-column-full">
          <div className="govuk-heading-xl">Book a research lab</div>
        </div>
      </div>
      <LabCalendarList />
      <div className="govuk-grid-row">
        <BookingContextProvider>
          <BookingForm />
        </BookingContextProvider>
      </div>
    </>
  );
};

export default LabBooking;
