import React, { useState } from 'react';
import dateFns from 'date-fns';

import LabCalendarHeader from './LabCalendarHeader';
import LabCalendarDays from './LabCalendarDays';
import LabCalendarCells from './LabCalendarCells';

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
        <LabCalendarCells month={currentMonth} calendar={calendar} />
      </div>
    </>
  );
};

export default LabCalendar;
