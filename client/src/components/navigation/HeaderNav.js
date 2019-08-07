import React, { useContext } from 'react';
import { Link } from '@reach/router';

import { UserContext } from '../../contexts/UserContext';

const HeaderNav = () => {
  const [userValues, setUserValues] = useContext(UserContext);

  const signOutUser = () => {
    setUserValues({
      isLoggedIn: false,
      id: '',
      firstName: '',
      lastName: ''
    });
    localStorage.removeItem('labtoken');
  };

  return (
    <nav>
      <ul
        id="navigation"
        className="govuk-header__navigation"
        aria-label="Top Level Navigation"
      >
        <li className="govuk-header__navigation-item">
          <Link className="govuk-header__link" to="/gds-research-labs">
            The GDS labs
          </Link>
        </li>
        {!userValues.isLoggedIn ? (
          <li
            className="govuk-header__navigation-item 
            govuk-header__navigation-item--active"
          >
            <Link className="govuk-header__link" to="/sign-in/email-password">
              Sign in
            </Link>
          </li>
        ) : (
          <>
            <li className="govuk-header__navigation-item">
              <Link
                className="govuk-header__link"
                to="/book-a-research-lab/booking-date"
              >
                Book a research lab
              </Link>
            </li>
            <li className="govuk-header__navigation-item">
              <Link className="govuk-header__link" to="/user/user-home">
                My bookings
              </Link>
            </li>
            <li className="govuk-header__navigation-item">
              <Link className="govuk-header__link" to="/" onClick={signOutUser}>
                Sign out
              </Link>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
};

export default HeaderNav;
