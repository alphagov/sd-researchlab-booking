import React from 'react';

import Footer from '../components/Footer';
import Header from '../components/Header';
import './layout.scss';

import { initAll } from 'govuk-frontend';

const Layout = ({ children }) => {
  initAll();
  return (
    <div className="govuk-template__body">
      <Header />
      <div className="govuk-width-container">
        <main className="govuk-main-wrapper " id="main-content" role="main">
          {children}
        </main>
      </div>

      <Footer />
    </div>
  );
};

export default Layout;
