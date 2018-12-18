import React from 'react';
import { withRouter } from 'react-router-dom';

const ConfirmRegistration = ({ history, userId }) => (
  <button
    className="button-primary"
    onClick={() => history.push(`/login/2fa/${userId}`)}
  >
    Complete login
  </button>
);

export default withRouter(ConfirmRegistration);
