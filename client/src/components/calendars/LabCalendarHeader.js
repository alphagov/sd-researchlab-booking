import React from 'react';
import dateFns from 'date-fns';
import styles from '../../css/LabCalendar.module.css';

const LabCalendarHeader = ({ month, nextMonth, prevMonth }) => {
  const dateFormat = 'MMM YYYY';

  return (
    <div className={`${styles.calHeader} ${styles.row} ${styles.flexMiddle}`}>
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

export default LabCalendarHeader;
