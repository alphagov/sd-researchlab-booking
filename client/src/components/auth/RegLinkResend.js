import React, { Component } from 'react';

class RegLinkResend extends Component {
  render() {
    return <button className="button-primary">Send again</button>;
  }
}

export default RegLinkResend;

// on the server
// using the id sent.....get email address
// create link
// save link
// send link
// redirect
