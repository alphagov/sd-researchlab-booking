import React from 'react';
import { withRouter } from 'react-router-dom';

const RegisterConfirm = ({ match }) => {
  console.log(match.params);
  return <div>Registration Confirmation</div>;
};

export default withRouter(RegisterConfirm);
