import React, { useState } from 'react';
import { Query } from 'react-apollo';
import dateFns from 'date-fns';

import styles from '../../css/LabCalendar.module.css';

const LabCalendar = ({ calendar }) => {
  const [currentMonth, setMonth] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(new Date());
  const { resourceName } = calendar;

  const prevMonth = () => {
    setMonth(dateFns.subMonths(currentMonth, 1));
  };

  const nextMonth = () => {
    setMonth(dateFns.addMonths(currentMonth, 1));
  };

  const onDateClick = (day) => {
    setSelectedDate(day);
  };

  const renderHeader = () => {
    const dateFormat = 'MMM YYYY';
    return (
      <div className={`${styles.header} ${styles.row} ${styles.flexMiddle}`}>
        <div className={`${styles.col} ${styles.colStart}`}>
          <div className={styles.icon} onClick={prevMonth}>
            chevron_left
          </div>
        </div>
        <div className={`${styles.col} ${styles.colCenter}`}>
          <span>{dateFns.format(currentMonth, dateFormat)}</span>
        </div>
        <div className={`${styles.col} ${styles.colEnd}`} onClick={nextMonth}>
          <div className={styles.icon}>chevron_right</div>
        </div>
      </div>
    );
  };

  const renderDays = () => {
    const dateFormat = 'dddd';
    const days = [];

    let startDate = dateFns.startOfWeek(currentMonth, { weekStartsOn: 1 });

    for (let i = 0; i < 7; i++) {
      days.push(
        <div className={`${styles.col} ${styles.colCenter}`} key={i}>
          {dateFns.format(dateFns.addDays(startDate, i), dateFormat)}
        </div>
      );
    }

    return <div className={`${styles.days} ${styles.row}`}>{days}</div>;
  };

  const renderCells = () => {
    const monthStart = dateFns.startOfMonth(currentMonth);
    const monthEnd = dateFns.endOfMonth(monthStart);
    const startDate = dateFns.startOfWeek(monthStart, { weekStartsOn: 1 });
    const endDate = dateFns.endOfWeek(monthEnd);

    const dateFormat = 'DD';
    const rows = [];
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
            }`}
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
    return <div className={styles.body}>{rows}</div>;
  };

  return (
    // <div className="govuk-grid-column-one-half">
    <>
      <h3 className="govuk-heading-m">{resourceName}</h3>
      <div className={styles.calendar}>
        {renderHeader()}
        {renderDays()}
        {renderCells()}
      </div>
    </>
    // </div>
  );
};

export default LabCalendar;
