import React, { useState } from 'react';
import dateFns from 'date-fns';

import LabCalendarHeader from './LabCalendarHeader';
import LabCalendarDays from './LabCalendarDays';
import LabCalendarCells from './LabCalendarCells';

import { Query } from 'react-apollo';
import { GET_CALENDAR_FREE_BUSY } from '../../queries';

import Spinner from '../shared/Spinner';
import Error from '../../containers/Error';

import styles from '../../css/LabCalendar.module.css';

const LabCalendar = ({ calendar }) => {
  const [currentMonth, setMonth] = useState(new Date());

  const { resourceName } = calendar;

  const prevMonth = () => {
    setMonth(dateFns.subMonths(currentMonth, 1));
  };

  const nextMonth = () => {
    setMonth(dateFns.addMonths(currentMonth, 1));
  };

  const monthStart = dateFns.startOfMonth(currentMonth);
  const monthEnd = dateFns.endOfMonth(monthStart);
  const startDate = dateFns.startOfWeek(monthStart, { weekStartsOn: 1 });
  const endDate = dateFns.endOfWeek(monthEnd);

  return (
    <>
      <h3 className="govuk-heading-m">{resourceName}</h3>
      <div className={styles.calendar}>
        <LabCalendarHeader
          month={currentMonth}
          prevMonth={prevMonth}
          nextMonth={nextMonth}
        />
        <LabCalendarDays month={currentMonth} />

        <Query
          query={GET_CALENDAR_FREE_BUSY}
          variables={{
            start: startDate,
            end: endDate,
            items: calendar.resourceEmail
          }}
          pollInterval={60000}
        >
          {({ loading, error, data }) => {
            if (loading) return <Spinner />;
            if (error) return <Error error={error} />;

            const { busy } = data.getCalendarFreeBusyList.calendars[0];
            const dateFormat = 'DD';

            const busyDays = busy.map((bDay) =>
              dateFns.format(bDay.start, dateFormat)
            );

            return (
              <LabCalendarCells month={currentMonth} busyDays={busyDays} />
            );
          }}
        </Query>
      </div>
    </>
  );
};

export default LabCalendar;
