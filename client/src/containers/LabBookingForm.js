import React from 'react';

const LabBookingForm = ({ children }) => {
  return (
    <>
      <div className="govuk-grid-row">
        <div className="govuk-grid-column-full">
          <div className="govuk-heading-xl">Book a research lab</div>
        </div>
      </div>
      <div>{children}</div>
    </>
  );
};

export default LabBookingForm;
