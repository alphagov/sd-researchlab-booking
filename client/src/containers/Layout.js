import React from 'react';
import './layout.css';

const Layout = ({ children }) => {
  return (
    <main>
      <nav>navbar</nav>
      {children}
      <footer>footer</footer>
    </main>
  );
};

export default Layout;
