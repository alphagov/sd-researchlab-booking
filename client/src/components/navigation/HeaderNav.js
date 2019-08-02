import React from 'react';
import { Link } from '@reach/router';

const HeaderNav = () => {
  return (
    <nav>
      <ul
        id="navigation"
        className="govuk-header__navigation "
        aria-label="Top Level Navigation"
      >
        <li className="govuk-header__navigation-item govuk-header__navigation-item--active">
          <Link className="govuk-header__link" to="/sign-in/email-password">
            Sign in
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default HeaderNav;
