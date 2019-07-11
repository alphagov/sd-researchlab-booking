import React from 'react';
import dateFns from 'date-fns';
import styles from '../../css/LabCalendar.module.css';

const LabCalendarCells = ({ busyDays, week }) => {
  const startDate = dateFns.startOfWeek(week, { weekStartsOn: 1 });
  const endDate = dateFns.addDays(week, 4);

  const dateFormat = 'DD';
  const rows = [];

  let dayCounter = startDate;
  let days = [];
  let formattedDate = '';
  while (dateFns.isBefore(dayCounter, endDate)) {
    for (let i = 0; i < 5; i++) {
      formattedDate = dateFns.format(dayCounter, dateFormat);

      days.push(
        <div
          className={`${styles.col} ${styles.cell} ${styles.colCenter}`}
          key={dayCounter}
        >
          <span className={styles.number}>{formattedDate}</span>
        </div>
      );

      dayCounter = dateFns.addDays(dayCounter, 1);
    }
    rows.push(
      <div className={`${styles.row}`} key={`${dayCounter}AM`}>
        {days}
      </div>
    );
    rows.push(
      <div className={`${styles.row}`} key={`${dayCounter}PM`}>
        {days}
      </div>
    );
    days = [];
  }
  return <div className={styles.calBody}>{rows}</div>;
};

export default LabCalendarCells;
