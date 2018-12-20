import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { Query } from 'react-apollo';

import { CHECK_USER_VERIFIED } from '../../queries';
import Login2FAResend from './Login2FAResend';

class Login2FA extends Component {
  render() {
    const { match, history } = this.props;
    const userId = match.params.id;
    return (
      <Query query={CHECK_USER_VERIFIED} variables={{ _id: userId }}>
        {({ loading, error, data }) => {
          if (loading) return <div>Loading.....</div>;
          const { ok } = data.checkUserVerified;
          if (error) {
            history.push('/login');
          }
          if (!ok) {
            history.push(`/register/confirm/${userId}`);
          }
          if (ok) {
            return (
              <div className="container">
                <div className="App">
                  <form>
                    <label htmlFor="2fa">Enter 2FA code</label>
                    <input type="number" name="2fa" />
                    <Login2FAResend userId={userId} />
                  </form>
                </div>
              </div>
            );
          }
        }}
      </Query>
    );
  }
}

export default withRouter(Login2FA);
