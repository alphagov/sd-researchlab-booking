import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { Query } from 'react-apollo';
import queryString from 'query-string';

import { GET_REG_TOKEN } from '../../queries';

class RegisterLink extends Component {
  // get query string
  componentDidMount() {
    const token = queryString.parse(this.props.location.search);
    console.log(token);
    // check the link has not expired
    // if not expired get user account
    // update verified flag on user
    // add jwt at this stage?

    // redirect to 2fa page

    // if expired display button for new link
    // we have email address
  }

  //
  render() {
    return <div>Register Link</div>;
  }
}

export default withRouter(RegisterLink);
