import React from 'react';
import { Link, Route, Switch } from 'react-router-dom';

import LabCalendarList from '../components/calendars/LabCalendarList';

import BookingFormDate from '../components/booking/BookingFormDate';
import BookingFormName from '../components/booking/BookingFormName';

const LabBooking = ({ match, children }) => {
  console.log(match);
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
            path="/book-a-research-lab/booking-date"
            component={BookingFormDate}
          />
          <Route
            path="/book-a-research-lab/booking-name"
            component={BookingFormName}
          />
        </Switch>
        <Link to="/book-a-research-lab/booking-date">Booking Date</Link>
      </div>
    </>
  );
};

export default LabBooking;
