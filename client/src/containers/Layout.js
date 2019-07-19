import React from 'react';
import { Router } from '@reach/router';

import '../css/layout.scss';

import { initAll } from 'govuk-frontend';

import Footer from '../components/navigation/Footer';
import Header from '../components/navigation/Header';
import Proto from '../components/banners/proto';
import Landing from './Landing';

import Labs from './Labs';
import LabBookingForm from './LabBookingForm';
import BookingFormDateCal from '../components/booking/BookingFormDateCal';
import BookingFormName from '../components/booking/BookingFormName';
import BookingFormDetails from '../components/booking/BookingFormDetails';
import BookingFormEquipment from '../components/booking/BookingFormEquipment';
import BookingFormSummary from '../components/booking/BookingFormSummary';

const Layout = () => {
  initAll();
  return (
    <div className="govuk-template__body govuk-rlab_body">
      <Header />
      <div className="govuk-width-container">
        <Proto />
        <main className="govuk-main-wrapper " id="main-content" role="main">
          <Router>
            <Landing path="/" />
            <Labs path="/gds-research-labs" />
            <LabBookingForm path="/book-a-research-lab">
              <BookingFormDateCal path="/booking-date" />
              <BookingFormName path="/booking-name" />
              <BookingFormDetails path="/booking-details" />
              <BookingFormEquipment path="/booking-equipment" />
              <BookingFormSummary path="/booking-summary" />
            </LabBookingForm>
          </Router>
        </main>
      </div>
      <Footer />
    </div>
  );
};

export default Layout;
