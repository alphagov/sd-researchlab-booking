import React from 'react';

import { timeInWords, readableDate, dateIsPast } from '../../utils/dateUtils';
import styles from '../../css/UserBooking.module.css';

const UserBookings = ({ booking }) => {
  const {
    eventTitle,
    eventStatus,
    eventStart,
    eventEnd,
    eventDescription,
    guests,
    equipment
  } = booking;
  return (
    <div className="govuk-grid-column-one-half">
      <dl className={`govuk-summary-list ${styles.summaryList}`}>
        <div className="govuk-summary-list__row">
          <dt className="govuk-summary-list__key">Title</dt>
          <dd className="govuk-summary-list__value">{eventTitle}</dd>
        </div>
        <div className="govuk-summary-list__row">
          <dt className="govuk-summary-list__key">Status</dt>
          <dd className={`govuk-summary-list__value ${styles.listValue}`}>
            {eventStatus}
          </dd>
        </div>
        <div className="govuk-summary-list__row">
          <dt className="govuk-summary-list__key">Starts</dt>
          <dd className="govuk-summary-list__value">
            {`${readableDate(eventStart)} (${
              dateIsPast(eventStart) ? '' : 'in'
            } ${timeInWords(eventStart)} ${
              !dateIsPast(eventStart) ? '' : 'ago'
            })`}
          </dd>
        </div>
        <div className="govuk-summary-list__row">
          <dt className="govuk-summary-list__key">Ends</dt>
          <dd className={`govuk-summary-list__value `}>
            {readableDate(eventEnd)}
          </dd>
        </div>
        <div className="govuk-summary-list__row">
          <dt className="govuk-summary-list__key">Description</dt>
          <dd className={`govuk-summary-list__value `}>{eventDescription}</dd>
        </div>
        <div className="govuk-summary-list__row">
          <dt className="govuk-summary-list__key">Number of guests</dt>
          <dd className={`govuk-summary-list__value `}>{guests}</dd>
        </div>
        <div className="govuk-summary-list__row">
          <dt className="govuk-summary-list__key">Equipment needed</dt>
          <dd className={`govuk-summary-list__value ${styles.listValue}`}>
            <ul className="govuk-list">
              {equipment.split(',').map((equip, i) => (
                <li key={i}>{equip}</li>
              ))}
            </ul>
          </dd>
        </div>
      </dl>
    </div>
  );
};

export default UserBookings;
