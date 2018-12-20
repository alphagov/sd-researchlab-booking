import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { Query, Mutation } from 'react-apollo';

import { CHECK_USER_VERIFIED, ENTER_2FA_CODE } from '../../queries';
import Login2FAResend from './Login2FAResend';

const initialState = {
  mfaCode: 0
};

class Login2FA extends Component {
  state = { ...initialState };

  clearState = () => {
    this.setState({ ...initialState });
  };

  handleChange = (event) => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  };

  validateForm = () => {
    const { mfaCode } = this.state;
    const isInValid = !mfaCode || mfaCode.length < 5;
    return isInValid;
  };

  handleSubmit = (event, enter2FACode) => {
    event.preventDefault();
    console.log(this.state);
    enter2FACode()
      .then(async ({ data }) => {
        console.log(data.enter2FACode);
      })
      .catch((error) => console.log(error));
  };

  render() {
    const { match, history } = this.props;
    const { mfaCode } = this.state;
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
                  <Mutation
                    mutation={ENTER_2FA_CODE}
                    variables={{ _id: userId, mfaCode }}
                  >
                    {(enter2FACode, { data, loading, error }) => {
                      return (
                        <form
                          onSubmit={(event) =>
                            this.handleSubmit(event, enter2FACode)
                          }
                        >
                          <label htmlFor="mfaCode">Enter 2FA code</label>
                          <input
                            type="number"
                            name="mfaCode"
                            onChange={this.handleChange}
                            value={mfaCode}
                          />
                          <button
                            className="button-primary"
                            type="submit"
                            disabled={loading || this.validateForm()}
                          >
                            Enter
                          </button>
                        </form>
                      );
                    }}
                  </Mutation>
                  <Login2FAResend userId={userId} />
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
