import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect
} from 'react-router-dom';

// import withSession from './components/withSession';
import Landing from './containers/Landing';
// import Register from './components/auth/Register';
import RegisterConfirm from './components/auth/RegisterConfirm';
import RegisterLink from './components/auth/RegisterLink';
import Login2FA from './components/auth/Login2FA';

import Labs from './containers/Labs';

const Root = () => (
  <Router>
    <Switch>
      <Route path="/" exact component={Landing} />
      {/* <Route
          path="/register"
          exact
          render={() => <Register refetch={refetch} />}
        /> */}
      <Route path="/register/confirm/:_id" component={RegisterConfirm} />
      <Route path="/register/verify" component={RegisterLink} />
      <Route path="/login/2fa/:id" component={Login2FA} />
      <Route path="/book-the-lab" component={Labs} />
      <Redirect to="/" />
    </Switch>
  </Router>
);

const Routes = Root;

export default Routes;
