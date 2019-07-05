import React, { useState } from 'react';
import { Query } from 'react-apollo';
import dateFns from 'date-fns';

import styles from '../../css/LabCalendar.module.css';

const renderHeader = (month) => {
  const dateFormat = 'MMM YYYY';
  return (
    <div className={`${styles.header} ${styles.row} ${styles.flexMiddle}`}>
      <div className={`${styles.col} ${styles.colStart}`}>
        <div className={styles.icon} onClick={prevMonth}>
          chevron_left
        </div>
      </div>
      <div className={`${styles.col} ${styles.colCenter}`}>
        <span>{dateFns.format(month, dateFormat)}</span>
      </div>
      <div className={`${styles.col} ${styles.colEnd}`} onClick={nextMonth}>
        <div className={styles.icon}>chevron_right</div>
      </div>
    </div>
  );
};

const renderDays = (month) => {
  const dateFormat = 'dddd';
  const days = [];

  let startDate = dateFns.startOfWeek(month);

  for (let i = 0; i < 7; i++) {
    days.push(
      <div className={`${styles.col} ${styles.colCenter}`} key={i}>
        {dateFns.format(dateFns.addDays(startDate, i), dateFormat)}
      </div>
    );
  }

  return <div className={`${styles.days} ${styles.row}`}>{days}</div>;
};

const prevMonth = () => {};

const nextMonth = () => {};

const LabCalendar = ({ calendar }) => {
  const [currentMonth, setMonth] = useState(new Date());
  const { resourceName } = calendar;
  return (
    <div className="govuk-grid-column-one-half">
      <h3 className="govuk-heading-m">{resourceName}</h3>
      {renderHeader(currentMonth)}
      {renderDays(currentMonth)}
    </div>
  );
};

export default LabCalendar;
