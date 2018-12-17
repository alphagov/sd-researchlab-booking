import React, { Fragment } from 'react';
import { withRouter } from 'react-router-dom';
import { Query } from 'react-apollo';
import queryString from 'query-string';

import { checkExpire } from '../../utils/dateUtils';
import { GET_REG_TOKEN } from '../../queries';
import RegLinkResend from './RegLinkResend';

const RegisterLink = ({ location, history }) => {
  const qs = queryString.parse(location.search);
  const regToken = qs.token;

  return (
    <div className="App">
      <h2>Register Link</h2>
      <Query query={GET_REG_TOKEN} variables={{ regToken }}>
        {({ loading, data, error }) => {
          if (loading) return <div>Loading information...........</div>;
          if (error) return <div>Ooops! {error}</div>;
          const { _id, createdAt, userId } = data.getRegToken;
          if (checkExpire(createdAt)) {
            return (
              <Fragment>
                <p>Your registration link has expired</p>
                <RegLinkResend regLinkId={_id} />
              </Fragment>
            );
          } else {
            // update the user as verified
            // mutation
            // get user id then push to their userId
            history.push(`/login/2fa/${userId}`);
          }
        }}
      </Query>
    </div>
  );
};

export default withRouter(RegisterLink);
