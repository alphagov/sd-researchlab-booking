import React from 'react';
import { Link } from 'react-router-dom';

const LabDetails = ({ lab }) => {
  const {
    resourceName,
    building: { buildingName },
    capacity,
    resourceId,
    floorName
  } = lab;
  return (
    <div>
      <div className="govuk-grid-column-one-half">
        <dl className="govuk-summary-list">
          <div className="govuk-summary-list__row">
            <dt className="govuk-summary-list__key">Name</dt>
            <dd className="govuk-summary-list__value">{resourceName}</dd>
          </div>
          <div className="govuk-summary-list__row">
            <dt className="govuk-summary-list__key">Capacity</dt>
            <dd className="govuk-summary-list__value">
              Room for {capacity} people
            </dd>
          </div>
          <div className="govuk-summary-list__row">
            <dt className="govuk-summary-list__key">Where</dt>
            <dd className="govuk-summary-list__value">
              {buildingName} on floor {floorName}
            </dd>
          </div>
        </dl>
        <Link
          to={`/book-a-research-lab/${resourceId}`}
          role="button"
          draggable="false"
          className="govuk-button govuk-button--start"
        >
          Book this lab
        </Link>
      </div>
    </div>
  );
};

export default LabDetails;
