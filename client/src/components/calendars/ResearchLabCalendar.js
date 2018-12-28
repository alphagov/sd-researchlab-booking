import React from 'react';
import BigCalendar from 'react-big-calendar';
import moment from 'moment';
import '../../../node_modules/react-big-calendar/lib/css/react-big-calendar.css';

const localizer = BigCalendar.momentLocalizer(moment);

const ResearchLabCalendar = ({ calendar }) => {
  const calEvents = [];
  const { resourceName, floorName, building } = calendar;
  return (
    <div>
      <h5>
        {resourceName} - floor {floorName} {building.buildingName}
      </h5>
      <BigCalendar
        views={{
          month: true,
          week: true,
          day: true
        }}
        localizer={localizer}
        events={calEvents}
        style={{ height: '400px' }}
      />
    </div>
  );
};

export default ResearchLabCalendar;
