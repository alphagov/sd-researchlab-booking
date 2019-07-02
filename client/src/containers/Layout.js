import React from 'react';

import Footer from '../components/navigation/Footer';
import Header from '../components/navigation/Header';
import Alpha from '../components/banners/alpha';
import './layout.scss';

import { initAll } from 'govuk-frontend';

const Layout = ({ children }) => {
  initAll();
  return (
    <div className="govuk-template__body govuk-rlab_body">
      <Header />
      <div className="govuk-width-container">
        <Alpha />
        <main className="govuk-main-wrapper " id="main-content" role="main">
          {children}
        </main>
      </div>

      <Footer />
    </div>
  );
};

export default Layout;
