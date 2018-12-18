import React, { Fragment } from 'react';
import { withRouter } from 'react-router-dom';
import { Query } from 'react-apollo';
import queryString from 'query-string';

import { checkExpire } from '../../utils/dateUtils';
import { GET_REG_TOKEN } from '../../queries';
import RegLinkResend from './RegLinkResend';
import ConfirmRegistration from './ConfirmRegistration';

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
            console.log(userId);
            return (
              <Fragment>
                <h4>Link verified</h4>
                <ConfirmRegistration userId={userId} />
              </Fragment>
            );
          }
        }}
      </Query>
    </div>
  );
};

export default withRouter(RegisterLink);
