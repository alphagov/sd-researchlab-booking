import React from 'react';
import { Link } from '@reach/router';

const SignInEmailPassword = () => {
  return (
    <div className="govuk-grid-row">
      <div className="govuk-grid-column-two-thirds">
        <fieldset className="govuk-fieldset">
          <legend className="govuk-fieldset__legend govuk-fieldset__legend--l">
            <h2 className="govuk-heading-l">Sign in</h2>
            <p className="govuk-body">
              If you do not have an account, you can{' '}
              <Link className="govuk-link" to="/register-to-book-the-lab">
                create one now
              </Link>
              .
            </p>
          </legend>
        </fieldset>
      </div>
    </div>
  );
};

export default SignInEmailPassword;
