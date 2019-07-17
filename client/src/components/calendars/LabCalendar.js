import React, { useState } from 'react';
import dateFns from 'date-fns';

import LabCalendarHeader from './LabCalendarHeader';
import LabCalendarDays from './LabCalendarDays';
import LabCalendarCells from './LabCalendarCells';

import styles from '../../css/LabCalendar.module.css';

const LabCalendar = ({ lab }) => {
  const [currentWeek, setWeek] = useState(
    dateFns.startOfWeek(new Date(), { weekStartsOn: 1 })
  );

  const { resourceName, freeBusy } = lab;

  const prevWeek = () => {
    setWeek(dateFns.subWeeks(currentWeek, 1));
  };

  const nextWeek = () => {
    setWeek(dateFns.addWeeks(currentWeek, 1));
  };

  const setToday = () => {
    setWeek(dateFns.startOfWeek(new Date(), { weekStartsOn: 1 }));
  };

  // this will be today's date
  const startDate = dateFns.startOfDay(new Date());
  // google only give 2 months of free/busy so get 2 months from todays date
  const endDate = dateFns.endOfDay(dateFns.addMonths(startDate, 1));

  const busyDays = freeBusy.map((bDay) => {
    return {
      date: bDay.end,
      am: dateFns.getHours(bDay.end) < 13,
      pm: dateFns.getHours(bDay.end) > 13,
      avail: false
    };
  });

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
        <LabCalendarCells week={currentWeek} busy={busyDays} />;
      </div>
    </>
  );
};

export default LabCalendar;
