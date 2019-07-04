import React from 'react';

import styles from '../css/Error.module.css';

const Error = ({ error }) => (
  <div
    className="govuk-error-summary"
    aria-labelledby="error-summary-title"
    role="alert"
    tabindex="-1"
    data-module="error-summary"
  >
    <h2 className="govuk-error-summary__title" id="error-summary-title">
      There is a problem
    </h2>
    <div className="govuk-error-summary__body">
      <ul className="govuk-list govuk-error-summary__list">
        <li>
          <p className={`govuk-body ${styles.errorPara}`}>{error.message}</p>
        </li>
      </ul>
    </div>
  </div>
);

export default Error;
