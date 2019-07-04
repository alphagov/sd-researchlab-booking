import React from 'react';
import LabList from '../components/lab/LabList';
import BookingInstructions from '../components/lab/BookingInstructions';

const Lab = () => {
  return (
    <div className="govuk-grid-row" style={{ height: '68vh' }}>
      <LabList />
      <BookingInstructions />
    </div>
  );
};

export default Lab;
