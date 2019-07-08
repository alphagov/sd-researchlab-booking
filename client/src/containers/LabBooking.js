import React from 'react';
import { Route, Switch } from 'react-router-dom';

import LabCalendarList from '../components/calendars/LabCalendarList';

import BookingFormDate from '../components/booking/BookingFormDate';
import BookingFormName from '../components/booking/BookingFormName';
import BookingFormDetails from '../components/booking/BookingFormDetails';

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
        <Switch>
          <Route
            path="/book-a-research-lab/start"
            component={BookingFormDate}
          />
          <Route
            path="/book-a-research-lab/booking-name"
            component={BookingFormName}
          />
          <Route
            path="/book-a-research-lab/booking-details"
            component={BookingFormDetails}
          />
        </Switch>
      </div>
    </>
  );
};

export default LabBooking;
