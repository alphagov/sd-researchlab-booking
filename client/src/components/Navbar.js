import React from 'react';
import { NavLink } from 'react-router-dom';
import styles from './Navbar.module.css';

const Navbar = () => {
  return <NavbarUnAuth />;
};

const NavbarUnAuth = () => (
  <nav>
    <NavLink to="/" exact className={styles.navLinks}>
      Home
    </NavLink>

    <NavLink to="/register" exact className={styles.navLinks}>
      Register
    </NavLink>

    <NavLink to="/research-labs" exact className={styles.navLinks}>
      Research Labs
    </NavLink>
  </nav>
);

export default Navbar;
