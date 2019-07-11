import React from 'react';
import dateFns from 'date-fns';
import styles from '../../css/LabCalendar.module.css';

const LabCalendarHeader = ({
  startDate,
  endDate,
  week,
  nextWeek,
  prevWeek,
  setToday
}) => {
  const dateFormat = 'MMM YYYY';

  return (
    <div className={`${styles.calHeader} ${styles.row} ${styles.flexMiddle}`}>
      <div className={`${styles.col} ${styles.colStart}`}>
        {!dateFns.isBefore(week, startDate) && (
          <button
            className="govuk-button govuk-button--secondary"
            onClick={prevWeek}
            style={{ marginBottom: '0px' }}
          >
            &laquo;
          </button>
        )}
      </div>
      <button
        className="govuk-button govuk-button--secondary"
        onClick={setToday}
        style={{ marginBottom: '0px' }}
      >
        Today
      </button>
      <div className={`${styles.col} ${styles.colCenter}`}>
        <span>
          <h3 className="govuk-heading-m" style={{ marginBottom: '0px' }}>
            {dateFns.format(week, dateFormat)}
          </h3>
        </span>
      </div>
      <div className={`${styles.col} ${styles.colEnd}`} onClick={nextWeek}>
        {!dateFns.isAfter(week, endDate) && (
          <button
            className="govuk-button govuk-button--secondary"
            onClick={prevWeek}
            style={{ marginBottom: '0px' }}
          >
            &raquo;
          </button>
        )}
      </div>
    </div>
  );
};

export default LabCalendarHeader;
