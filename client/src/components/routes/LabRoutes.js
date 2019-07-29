import React, { lazy } from 'react';
import { Route } from 'react-router-dom';

const Labs = lazy(() => import('../../containers/Labs'));
const LabBooking = lazy(() => import('../../containers/LabBooking'));

const LabRoutes = () => {
  return (
    <>
      <Route path="/gds-research-labs" component={Labs} />
      <Route path="/book-a-research-lab" component={LabBooking} />
    </>
  );
};

export default function() {
  return LabRoutes;
}
