import React from 'react';
import { Route } from 'react-router-dom';

import Landing from '../../containers/Landing';

const BasicRoutes = () => {
  return (
    <>
      <Route path="/" exact component={Landing} />
    </>
  );
};

export default function() {
  return BasicRoutes;
}
