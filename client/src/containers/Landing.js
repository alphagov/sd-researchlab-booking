import React from 'react';

import Content from '../components/landing/Content';

import styles from '../css/Landing.module.css';

const Landing = () => {
  return (
    <>
      <div className="govuk-grid-row">
        <div className="govuk-grid-column-full">
          <span className="govuk-caption-xl">Guidance</span>
          <h1 className="govuk-heading-xl">Book the GDS user research lab</h1>
        </div>
        <div className="govuk-grid-column-two-thirds">
          <p className="govuk-body-l">
            The Government Digital Service (GDS) has a state of the art user
            research lab which is open for any public sector research into
            projects and services.
          </p>
        </div>
        <hr className="govuk-section-break govuk-section-break--visible" />
      </div>
      <div className="govuk-grid-row">
        <div className={styles.metadataWrapper}>
          <div
            className={`govuk-grid-column-two-thirds ${styles.metadataColumn}`}
          >
            <div className={styles.metadata}>
              <p className="govuk-body-s">Published on 16th August 2018</p>
              <p className="govuk-body-s">
                From:{' '}
                <a
                  href="https://gov.uk/government/organisations/government-digital-service"
                  className="govuk-link"
                >
                  Government Digital Service
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>
      <Content />
    </>
  );
};

export default Landing;
