import React, { useContext } from 'react';
import { Link } from '@reach/router';

import { UserContext } from '../../contexts/UserContext';

const HeaderNav = () => {
  const [userValues, setUserValues] = useContext(UserContext);

  return (
    <nav>
      <ul
        id="navigation"
        className="govuk-header__navigation "
        aria-label="Top Level Navigation"
      >
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
          <li className="govuk-header__navigation-item govuk-header__navigation-item--active">
            <Link className="govuk-header__link" to="/sign-out">
              Sign out
            </Link>
          </li>
        )}
      </ul>
    </nav>
  );
};

export default HeaderNav;
