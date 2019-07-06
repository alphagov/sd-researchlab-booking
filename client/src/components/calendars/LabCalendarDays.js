import React from 'react';
import dateFns from 'date-fns';
import styles from '../../css/LabCalendar.module.css';

const LabCalendarDays = ({ month }) => {
  const dateFormat = 'ddd';
  const days = [];

  let startDate = dateFns.startOfWeek(month, { weekStartsOn: 1 });

  for (let i = 0; i < 7; i++) {
    days.push(
      <div className={`${styles.col} ${styles.colCenter}`} key={i}>
        {dateFns.format(dateFns.addDays(startDate, i), dateFormat)}
      </div>
    );
  }

  return <div className={`${styles.days} ${styles.row}`}>{days}</div>;
};

export default LabCalendarDays;
