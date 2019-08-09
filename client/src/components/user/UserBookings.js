import React from 'react';

import { timeInWords, readableDate } from '../../utils/dateUtils';

const UserBookings = ({ booking }) => {
  const { eventTitle, eventStatus, eventStart } = booking;
  return (
    <div className="govuk-grid-column-one-half">
      <dl className="govuk-summary-list">
        <div className="govuk-summary-list__row">
          <dt className="govuk-summary-list__key">Title</dt>
          <dd className="govuk-summary-list__value">{eventTitle}</dd>
        </div>
        <div className="govuk-summary-list__row">
          <dt className="govuk-summary-list__key">Starts</dt>
          <dd className="govuk-summary-list__value">
            {readableDate(eventStart)} {timeInWords(eventStart)}
          </dd>
        </div>
      </dl>
    </div>
  );
};

export default UserBookings;
