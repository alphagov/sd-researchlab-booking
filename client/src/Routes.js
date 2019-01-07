import React, { Fragment } from 'react';
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect
} from 'react-router-dom';
import styles from './Routes.module.css';

// import withSession from './components/withSession';
import Landing from './pages/Landing';
import Navbar from './components/navigation/Navbar';
// import Register from './components/auth/Register';
import RegisterConfirm from './components/auth/RegisterConfirm';
import RegisterLink from './components/auth/RegisterLink';
import Login2FA from './components/auth/Login2FA';

import Researchlabs from './pages/ResearchLabs';

const Root = () => (
  <Router>
    <Fragment>
      <Navbar />
      <main className={styles.main_layout}>
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
          <Route path="/research-labs" component={Researchlabs} />
          <Redirect to="/" />
        </Switch>
      </main>
    </Fragment>
  </Router>
);

const Routes = Root;

export default Routes;
