import React from 'react';
import { NavLink } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav>
      <NavbarUnAuth />
    </nav>
  );
};

const NavbarUnAuth = () => (
  <ul>
    <li>
      <NavLink to="/" exact>
        Home
      </NavLink>
    </li>
    <li>Sign in</li>
    <li>
      <NavLink to="/register" exact>
        Register
      </NavLink>
    </li>
    <li>
      <NavLink to="/research-labs" exact>
        Research Labs
      </NavLink>
    </li>
  </ul>
);

export default Navbar;
