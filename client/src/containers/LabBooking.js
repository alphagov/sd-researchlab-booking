import React from 'react';

import BookingForm from '../components/booking/BookingForm';
import LabCalendarList from '../components/calendars/LabCalendarList';

const LabBooking = () => {
  return (
    <>
      <div className="govuk-grid-row">
        <div className="govuk-grid-column-full">
          <div className="govuk-heading-xl">Book a research lab</div>
        </div>
      </div>
      <div className="govuk-grid-row">
        <LabCalendarList />
      </div>
      <div className="govuk-grid-row">
        <BookingForm />
      </div>
    </>
  );
};

export default LabBooking;
