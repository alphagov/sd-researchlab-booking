import React, { useState } from 'react';
import dateFns from 'date-fns';
import styles from '../../css/LabCalendar.module.css';

const LabCalendarCells = ({ month, busyDays }) => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const monthStart = dateFns.startOfMonth(month);
  const monthEnd = dateFns.endOfMonth(monthStart);
  const startDate = dateFns.startOfWeek(monthStart, { weekStartsOn: 1 });
  const endDate = dateFns.endOfWeek(monthEnd);

  const dateFormat = 'DD';
  const rows = [];

  const onDateClick = (day) => {
    setSelectedDate(day);
  };

  let days = [];
  let day = startDate;
  let formattedDate = '';
  while (day <= endDate) {
    for (let i = 0; i < 7; i++) {
      formattedDate = dateFns.format(day, dateFormat);
      const cloneDay = day;

      days.push(
        <div
          className={`${styles.col} ${styles.cell} ${
            !dateFns.isSameMonth(day, monthStart)
              ? `${styles.disabled}`
              : dateFns.isSameDay(day, selectedDate)
              ? `${styles.selected}`
              : ''
          } ${busyDays.includes(formattedDate) && styles.disabledBusy}`}
          key={day}
          onClick={() => onDateClick(dateFns.parse(cloneDay))}
        >
          <span className={styles.number}>{formattedDate}</span>
          <span className={styles.bg}>{formattedDate}</span>
        </div>
      );

      day = dateFns.addDays(day, 1);
    }
    rows.push(
      <div className={styles.row} key={day}>
        {days}
      </div>
    );
    days = [];
  }
  return <div className={styles.calBody}>{rows}</div>;
};

export default LabCalendarCells;
