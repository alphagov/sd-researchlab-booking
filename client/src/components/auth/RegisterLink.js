import React from 'react';
import { withRouter } from 'react-router-dom';
import { Query } from 'react-apollo';
import queryString from 'query-string';

import { GET_REG_TOKEN } from '../../queries';

const RegisterLink = ({ location }) => {
  const token = queryString.parse(location.search);
  console.log(token);
  return <div>Register Link</div>;
};

export default withRouter(RegisterLink);
