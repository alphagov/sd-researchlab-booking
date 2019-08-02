import React from 'react';
import { Query } from 'react-apollo';
import queryString from 'query-string';
import { navigate } from '@reach/router';
import Spinner from '../shared/Spinner';
import Error from '../../containers/Error';

import { CHECK_REG_TOKEN } from '../../queries';
// import ConfirmRegistration from './ConfirmRegistration';

const RegisterLink = ({ location }) => {
  const qs = queryString.parse(location.search);
  const regToken = qs.token;

  return (
    <div className="govuk-grid-row">
      <div className="govuk-grid-column-full">
        <Query
          query={CHECK_REG_TOKEN}
          variables={{ token: regToken }}
          fetchPolicy="no-cache"
        >
          {({ loading, data, error }) => {
            if (loading) return <Spinner />;
            if (error) return <Error error={error} />;
            const { success, token, user } = data.registerTokenCheck;
            localStorage.setItem('labtoken', token);
            return (
              <>
                {success && (
                  <div className="govuk-panel govuk-panel--confirmation">
                    <h1 className="govuk-panel__title">
                      Registration confirmed
                    </h1>
                    <div className="govuk-panel__body">
                      Thank you {user.firstName} your registration has now been
                      confirmed
                      <br />
                      You can now complete your sign in
                      <br />
                      <br />
                      <button
                        className="govuk-button"
                        onClick={() => navigate('/sign-in/2fa')}
                      >
                        Finish signing in
                      </button>
                      <br />
                    </div>
                  </div>
                )}
              </>
            );
          }}
        </Query>
      </div>
    </div>
  );
};

export default RegisterLink;
