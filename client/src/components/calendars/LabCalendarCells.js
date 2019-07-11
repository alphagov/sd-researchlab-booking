import React, { Fragment } from 'react';
import dateFns from 'date-fns';
import styles from '../../css/LabCalendar.module.css';

const LabCalendarCells = ({ busy, week }) => {
  const startDate = dateFns.startOfWeek(week, { weekStartsOn: 1 });
  // const endDate = dateFns.addDays(week, 4);

  const dateFormat = 'DD';
  const rows = [];
  const amDays = [];
  const pmDays = [];

  let dayBuild = {};
  let isBusy = false;
  let dayCounter = startDate;

  for (let i = 0; i < 5; i++) {
    // check for am busy and build
    for (let x = 0; x < busy.length; x++) {
      if (dateFns.isSameDay(busy[x].date, dayCounter) && busy[x].am) {
        dayBuild = busy[x];
        isBusy = true;
      }
    }

    if (!isBusy) {
      dayBuild = { date: dayCounter, am: true, pm: false, avail: true };
    }

    amDays.push(dayBuild);
    dayCounter = dateFns.addDays(dayCounter, 1);
    dayBuild = {};
    isBusy = false;
  }

  // reset the day counter
  dayCounter = startDate;
  for (let i = 0; i < 5; i++) {
    // check for pm busy and build

    for (let x = 0; x < busy.length; x++) {
      if (dateFns.isSameDay(busy[x].date, dayCounter) && busy[x].pm) {
        dayBuild = busy[x];
        isBusy = true;
      }
    }

    if (!isBusy) {
      dayBuild = { date: dayCounter, am: false, pm: true, avail: true };
    }

    pmDays.push(dayBuild);
    dayCounter = dateFns.addDays(dayCounter, 1);
    dayBuild = {};
    isBusy = false;
  }

  rows.push(
    <Fragment key="9">
      <div className={`${styles.row}`} key={`${startDate}-am`}>
        {amDays.map((calDay, i) => {
          return (
            <div
              className={`${
                calDay.avail ? `${styles.calFree}` : `${styles.calBusy}`
              } ${styles.col} ${styles.cell} ${styles.colCenter}`}
              key={`${calDay.date}-am${i}`}
            >
              <span className={styles.number}>
                {dateFns.format(calDay.date, dateFormat)}
              </span>
              <span className={styles.dayBlock}>{calDay.am ? 'AM' : 'PM'}</span>
            </div>
          );
        })}
      </div>
      <div className={`${styles.row}`} key={`${startDate}-pm`}>
        {pmDays.map((calDay, i) => {
          return (
            <div
              className={`${
                calDay.avail ? `${styles.calFree}` : `${styles.calBusy}`
              } ${styles.col} ${styles.cell} ${styles.colCenter}`}
              key={`${calDay.date}-pm${i}`}
            >
              <span className={styles.dayBlock}>{calDay.am ? 'AM' : 'PM'}</span>
            </div>
          );
        })}
      </div>
    </Fragment>
  );

  return <div className={styles.calBody}>{rows}</div>;
};

export default LabCalendarCells;
