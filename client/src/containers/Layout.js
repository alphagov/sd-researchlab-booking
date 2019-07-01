import React from 'react';

import Footer from '../components/Footer';
import Header from '../components/Header';
import './layout.scss';

import { initAll } from 'govuk-frontend';

initAll();

const Layout = ({ children }) => {
  return (
    <>
      <Header />
      <div className="govuk-width-container">
        <main className="govuk-main-wrapper " id="main-content" role="main">
          {children}
        </main>
      </div>

      <Footer />
    </>
  );
};

export default Layout;
