import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { Query } from 'react-apollo';

import { CHECK_USER_VERIFIED } from '../../queries';

class TwoFactor extends Component {
  render() {
    const { match, history } = this.props;
    const userId = match.params;
    return (
      <Query query={CHECK_USER_VERIFIED} variables={{ _id: userId }}>
        {({ loading, error, data }) => {
          if (loading) return <div>Loading.....</div>;
          const { ok } = data.checkUserVerified;
          if (ok) {
            return (
              <div className="container">
                <form>
                  <input type="number" />
                </form>
              </div>
            );
          }
        }}
      </Query>
    );
  }
}

export default withRouter(TwoFactor);
