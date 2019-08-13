import React, { lazy, Suspense, useContext } from 'react';
import { Router } from '@reach/router';

import { UserContext } from '../contexts/UserContext';

import '../css/layout.scss';

import { initAll } from 'govuk-frontend';

import Spinner from '../components/shared/Spinner';

import Footer from '../components/navigation/Footer';
import Header from '../components/navigation/Header';
import Proto from '../components/banners/proto';
import Landing from './Landing';

// lazy loading components
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
const SignIn2FAResend = lazy(() =>
  import('../components/auth/Signin2FAResend')
);

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

const UserHome = lazy(() => import('./User'));

const PublicRoutes = () => {
  return (
    <Router>
      <Landing path="/" />
      <Register path="/register-to-book-the-lab" />
      <RegisterConfirm path="/register/confirm/:id" />
      <RegisterLink path="/register/verify" />
      <RegisterLinkResend path="/register/link-resend" />
      <SignInEmailPassword path="/sign-in/email-password" />
      <SignIn2FAForm path="/sign-in/2fa" />
      <SignIn2FAResend path="/sign-in/resend-code" />
      <Labs path="/gds-research-labs" />
      <SignInEmailPassword default />
    </Router>
  );
};

const PrivateRoutes = () => {
  return (
    <Router>
      <Landing path="/" />
      <Register path="/register-to-book-the-lab" />
      <RegisterConfirm path="/register/confirm/:id" />
      <RegisterLink path="/register/verify" />
      <RegisterLinkResend path="/register/link-resend" />
      <SignInEmailPassword path="/sign-in/email-password" />
      <SignIn2FAForm path="/sign-in/2fa" />
      <SignIn2FAResend path="/sign-in/resend-code" />
      <UserHome path="/user/user-home" />
      <Labs path="/gds-research-labs" />
      <LabBookingForm path="/book-a-research-lab">
        <BookingFormDateCal path="/booking-date" />
        <BookingFormName path="/booking-name" />
        <BookingFormDetails path="/booking-details" />
        <BookingFormEquipment path="/booking-equipment" />
        <BookingFormSummary path="/booking-summary" />
      </LabBookingForm>
      <SignInEmailPassword default />
    </Router>
  );
};

const Layout = () => {
  const [userValues] = useContext(UserContext);

  initAll();
  return (
    <div className="govuk-template__body govuk-rlab_body">
      <Header />
      <div className="govuk-width-container">
        <Proto />
        <main className="govuk-main-wrapper " id="main-content" role="main">
          <Suspense fallback={<Spinner />}>
            {userValues.isLoggedIn ? <PrivateRoutes /> : <PublicRoutes />}
          </Suspense>
        </main>
      </div>
      <Footer />
    </div>
  );
};

export default Layout;
