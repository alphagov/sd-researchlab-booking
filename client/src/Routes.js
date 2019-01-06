import React, { Fragment } from 'react';
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect
} from 'react-router-dom';

// import withSession from './components/withSession';
import App from './components/App';
import Navbar from './components/Navbar';
// import Register from './components/auth/Register';
import RegisterConfirm from './components/auth/RegisterConfirm';
import RegisterLink from './components/auth/RegisterLink';
import Login2FA from './components/auth/Login2FA';

import Researchlabs from './components/ResearchLabs';

const Root = () => (
  <Router>
    <Fragment>
      <Navbar />
      <Switch>
        <Route path="/" exact component={App} />
        {/* <Route
          path="/register"
          exact
          render={() => <Register refetch={refetch} />}
        /> */}
        <Route path="/register/confirm/:_id" component={RegisterConfirm} />
        <Route path="/register/verify" component={RegisterLink} />
        <Route path="/login/2fa/:id" component={Login2FA} />
        <Route path="/research-labs" component={Researchlabs} />
        <Redirect to="/" />
      </Switch>
    </Fragment>
  </Router>
);

const Routes = Root;

export default Routes;
