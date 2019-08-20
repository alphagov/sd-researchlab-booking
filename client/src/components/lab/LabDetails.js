import React from 'react';

const LabDetails = ({ lab }) => {
  const {
    resourceName,
    building: { buildingName },
    capacity,
    floorName,
    usage
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
          <div className="govuk-summary-list__row">
            <dt className="govuk-summary-list__key">Details</dt>
            <dd className="govuk-summary-list__value">
              {`Typically booked for ${usage}% of the time`}
            </dd>
          </div>
        </dl>
      </div>
    </div>
  );
};

export default LabDetails;
