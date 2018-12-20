import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { Mutation } from 'react-apollo';

import { ENTER_2FA_CODE } from '../../queries';

const initialState = {
  mfaCode: ''
};

class Login2FAForm extends Component {
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

    enter2FACode()
      .then(async ({ data }) => {
        const { ok, _id } = data.enter2FACode;
        if (ok) {
          console.log(_id);
          // if ok then redirect to calendar page
        } else {
          console.log('not ok');
        }
      })
      .catch((error) => console.log(error));
  };

  render() {
    const { mfaCode } = this.state;
    const { userId } = this.props;
    return (
      <Mutation mutation={ENTER_2FA_CODE} variables={{ _id: userId, mfaCode }}>
        {(enter2FACode, { data, loading, error }) => {
          return (
            <form onSubmit={(event) => this.handleSubmit(event, enter2FACode)}>
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
              {error && <div>{error}</div>}
            </form>
          );
        }}
      </Mutation>
    );
  }
}

export default withRouter(Login2FAForm);
