import React from 'react';
import { Router } from '@reach/router';

import '../css/layout.scss';

import { initAll } from 'govuk-frontend';

import Footer from '../components/navigation/Footer';
import Header from '../components/navigation/Header';
import Proto from '../components/banners/proto';
import Landing from './Landing';

import Labs from './Labs';
import LabBooking from './LabBooking';
import BookingFormName from '../components/booking/BookingFormName';
import BookingFormDetails from '../components/booking/BookingFormDetails';

const Layout = () => {
  initAll();
  return (
    <Router>
      <div className="govuk-template__body govuk-rlab_body">
        <Header />
        <div className="govuk-width-container">
          <Proto />
          <main className="govuk-main-wrapper " id="main-content" role="main">
            <Landing path="/" />
            <Labs path="/gds-research-labs" />
            <LabBooking path="/book-a-research-lab" />

            {/* <Route
                exact
                path="/book-a-research-lab/booking-name"
                component={BookingFormName}
              />
              <Route
                path="/book-a-research-lab/booking-details"
                component={BookingFormDetails}
              /> */}
          </main>
        </div>
        <Footer />
      </div>
    </Router>
  );
};

export default Layout;
