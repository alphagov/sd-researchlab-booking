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
  const [currentWeek, setWeek] = useState(
    dateFns.startOfWeek(new Date(), { weekStartsOn: 1 })
  );

  const { resourceName } = calendar;

  // const prevMonth = () => {
  //   setMonth(dateFns.subMonths(currentMonth, 1));
  // };

  const prevWeek = () => {
    setWeek(dateFns.subWeeks(currentWeek, 1));
  };

  // const nextMonth = () => {
  //   setMonth(dateFns.addMonths(currentMonth, 1));
  // };

  const nextWeek = () => {
    setWeek(dateFns.addWeeks(currentWeek, 1));
  };

  const setToday = () => {
    setWeek(dateFns.startOfWeek(new Date(), { weekStartsOn: 1 }));
  };

  // const monthStart = dateFns.startOfMonth(currentMonth);
  // const monthEnd = dateFns.endOfMonth(monthStart);
  // this will be today's date
  const startDate = new Date();
  // google only give 2 months of free/busy so get 2 months from todays date
  const endDate = dateFns.addMonths(startDate, 2);

  return (
    <>
      <h3 className="govuk-heading-m">{resourceName}</h3>
      <div className={styles.calendar}>
        <LabCalendarHeader
          startDate={startDate}
          endDate={endDate}
          week={currentWeek}
          prevWeek={prevWeek}
          nextWeek={nextWeek}
          setToday={setToday}
        />
        <LabCalendarDays week={currentWeek} />

        <Query
          query={GET_CALENDAR_FREE_BUSY}
          variables={{
            start: startDate,
            end: endDate,
            items: calendar.resourceEmail
          }}
          // pollInterval={60000}
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
              <LabCalendarCells
                month={currentMonth}
                week={currentWeek}
                busyDays={busyDays}
              />
            );
          }}
        </Query>
      </div>
    </>
  );
};

export default LabCalendar;
