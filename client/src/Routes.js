import React, { Fragment } from 'react';
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect
} from 'react-router-dom';
import App from './components/App';
import Navbar from './components/Navbar';

const Routes = () => (
  <Router>
    <Fragment>
      <Navbar />
      <Switch>
        <Route path="/" exact component={App} />
      </Switch>
    </Fragment>
  </Router>
);

export default Routes;
