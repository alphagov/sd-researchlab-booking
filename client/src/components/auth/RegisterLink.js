import React, { Fragment } from 'react';
import { withRouter, Link } from 'react-router-dom';
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
      <Query query={GET_REG_TOKEN} variables={{ regToken }}>
        {({ loading, data, error }) => {
          if (loading) return <div>Loading information...........</div>;
          if (error) return <div>Ooops! {error}</div>;
          const { _id, createdAt, userId } = data.getRegToken;
          console.log(data.getRegToken);
          if (checkExpire(createdAt)) {
            return (
              <Fragment>
                <h4>Your registration link has expired</h4>
                <RegLinkResend regLinkId={_id} />
              </Fragment>
            );
          } else {
            // update the user as verified
            // mutation
            return (
              <Fragment>
                <h4>Link verified</h4>
                <button
                  className="button-primary"
                  onClick={() => history.push(`/login/2fa/${userId}`)}
                >
                  Complete login
                </button>
              </Fragment>
            );
            // get user id then push to their userId
          }
        }}
      </Query>
    </div>
  );
};

export default withRouter(RegisterLink);
