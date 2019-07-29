import React from 'react';
import dateFns from 'date-fns';
import styles from '../../css/LabCalendar.module.css';

const LabCalendarDays = ({ week }) => {
  const dateFormat = 'ddd';
  const days = [];

  for (let i = 0; i < 5; i++) {
    days.push(
      <div className={`${styles.col} ${styles.colCenter}`} key={i}>
        <h4 className="govuk-heading-s" style={{ marginBottom: '0px' }}>
          {dateFns.format(dateFns.addDays(week, i), dateFormat)}
        </h4>
      </div>
    );
  }

  return <div className={`${styles.days} ${styles.row}`}>{days}</div>;
};

export default LabCalendarDays;
