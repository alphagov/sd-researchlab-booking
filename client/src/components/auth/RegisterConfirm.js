import React from 'react';
import { withRouter } from 'react-router-dom';

const RegisterConfirm = ({ match }) => {
  console.log(match.params);
  return (
    <div className="App">
      <h2>Registration Confirmation</h2>
      <p>
        A confirmation link has been sent to your email account please click on
        this link to complete your registration
      </p>
      <p>Didn't receive the email?</p>
      {/* add this as a separate component  - the button */}
      <button className="button-primary">Send again</button>
    </div>
  );
};

export default withRouter(RegisterConfirm);
