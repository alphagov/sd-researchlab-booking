import React, { Fragment } from 'react';
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect
} from 'react-router-dom';

import withSession from './components/withSession';
import App from './components/App';
import Navbar from './components/Navbar';
import Register from './components/auth/Register';
import RegisterConfirm from './components/auth/RegisterConfirm';

const Root = ({ refetch, session }) => (
  <Router>
    <Fragment>
      <Navbar session={session} />
      <Switch>
        <Route path="/" exact component={App} />
        <Route
          path="/register"
          exact
          render={() => <Register refetch={refetch} />}
        />
        <Route path="/register/confirm/:_id" component={RegisterConfirm} />
        <Redirect to="/" />
      </Switch>
    </Fragment>
  </Router>
);

const Routes = withSession(Root);

export default Routes;
