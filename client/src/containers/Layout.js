import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect
} from 'react-router-dom';

import BasicRoutes from '../components/routes/BasicRoutes';
import LabRoutes from '../components/routes/LabRoutes';

import Footer from '../components/navigation/Footer';
import Header from '../components/navigation/Header';
import Proto from '../components/banners/proto';
import '../css/layout.scss';

import { initAll } from 'govuk-frontend';

const Layout = ({ children }) => {
  initAll();
  return (
    <Router>
      <div className="govuk-template__body govuk-rlab_body">
        <Header />
        <div className="govuk-width-container">
          <Proto />
          <main className="govuk-main-wrapper " id="main-content" role="main">
            {/* <Switch> */}
            <Route>{BasicRoutes}</Route>
            <Route>{LabRoutes}</Route>
            <Redirect to="/" />
            {/* </Switch> */}
            {children}
          </main>
        </div>
        <Footer />
      </div>
    </Router>
  );
};

export default Layout;
