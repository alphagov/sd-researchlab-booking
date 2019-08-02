import React, { lazy, Suspense } from 'react';
import { Router } from '@reach/router';

import '../css/layout.scss';

import { initAll } from 'govuk-frontend';

import Spinner from '../components/shared/Spinner';

import Footer from '../components/navigation/Footer';
import Header from '../components/navigation/Header';
import Proto from '../components/banners/proto';
import Landing from './Landing';

// lazy laoding components
const Register = lazy(() => import('./Register'));
const RegisterLink = lazy(() => import('../components/register/RegisterLink'));
const RegisterLinkResend = lazy(() =>
  import('../components/register/RegisterLinkResend')
);
const RegisterConfirm = lazy(() =>
  import('../components/register/RegisterConfirm')
);

const SignInEmailPassword = lazy(() =>
  import('../components/auth/SignInEmailPassword')
);
const SignIn2FAForm = lazy(() => import('../components/auth/SignIn2FAForm'));

const Labs = lazy(() => import('./Labs'));
const LabBookingForm = lazy(() => import('./LabBookingForm'));
const BookingFormDateCal = lazy(() =>
  import('../components/booking/BookingFormDateCal')
);
const BookingFormName = lazy(() =>
  import('../components/booking/BookingFormName')
);
const BookingFormDetails = lazy(() =>
  import('../components/booking/BookingFormDetails')
);
const BookingFormEquipment = lazy(() =>
  import('../components/booking/BookingFormEquipment')
);
const BookingFormSummary = lazy(() =>
  import('../components/booking/BookingFormSummary')
);

const Layout = () => {
  initAll();
  return (
    <div className="govuk-template__body govuk-rlab_body">
      <Header />
      <div className="govuk-width-container">
        <Proto />
        <main className="govuk-main-wrapper " id="main-content" role="main">
          <Suspense fallback={<Spinner />}>
            <Router>
              <Landing path="/" />
              <Register path="/register-to-book-the-lab" />
              <RegisterConfirm path="/register/confirm/:id" />
              <RegisterLink path="/register/verify" />
              <RegisterLinkResend path="/register/link-resend" />
              <SignInEmailPassword path="/sign-in/email-password" />
              <SignIn2FAForm path="/sign-in/2fa" />
              <Labs path="/gds-research-labs" />
              <LabBookingForm path="/book-a-research-lab">
                <BookingFormDateCal path="/booking-date" />
                <BookingFormName path="/booking-name" />
                <BookingFormDetails path="/booking-details" />
                <BookingFormEquipment path="/booking-equipment" />
                <BookingFormSummary path="/booking-summary" />
              </LabBookingForm>
            </Router>
          </Suspense>
        </main>
      </div>
      <Footer />
    </div>
  );
};

export default Layout;
