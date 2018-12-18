import React, { Fragment } from 'react';
import { withRouter } from 'react-router-dom';
import { Query } from 'react-apollo';
import queryString from 'query-string';

import { CHECK_REG_TOKEN } from '../../queries';
import RegLinkResend from './RegLinkResend';
import ConfirmRegistration from './ConfirmRegistration';

const RegisterLink = ({ location }) => {
  const qs = queryString.parse(location.search);
  const regToken = qs.token;

  return (
    <div className="App">
      <Query query={CHECK_REG_TOKEN} variables={{ regToken }}>
        {({ loading, data, error }) => {
          if (loading) return <div>Loading information...........</div>;
          if (error) return <div>Ooops! {error}</div>;
          const { _id, ok } = data.checkRegToken;
          // console.log(data);
          return (
            <div>
              {ok ? (
                <Fragment>
                  <h4>Link verified</h4>
                  <ConfirmRegistration userId={_id} />
                </Fragment>
              ) : (
                <Fragment>
                  <h4>{data.checkRegToken.error}</h4>
                  <RegLinkResend userId={_id} />
                </Fragment>
              )}
            </div>
          );
        }}
      </Query>
    </div>
  );
};

export default withRouter(RegisterLink);
