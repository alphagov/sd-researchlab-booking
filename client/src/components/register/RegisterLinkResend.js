import React, { Component } from 'react';
import { Mutation } from 'react-apollo';

import { RESEND_REG_LINK } from '../../queries';

class RegLinkResend extends Component {
  state = {
    userId: this.props.userId
  };

  sendLink = (resendRegLink) => {
    resendRegLink()
      .then(async ({ data }) => {
        console.log(data.resendRegLink);
        const { ok, _id } = data.resendRegLink;
        if (ok) {
          this.props.history.push(`/register/confirm/${_id}`);
        }
      })
      .catch((error) => console.log(error));
  };

  render() {
    return (
      <Mutation mutation={RESEND_REG_LINK} variables={this.state.userId}>
        {(resendRegLink, { data, loading, error }) => {
          return (
            <button
              className="button-primary"
              onClick={() => this.sendLink(resendRegLink)}
            >
              Send again
            </button>
          );
        }}
      </Mutation>
    );
  }
}

export default RegLinkResend;
