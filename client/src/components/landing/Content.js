import React from 'react';
import { Link } from '@reach/router';

const Content = () => {
  return (
    <>
      <section className="responsive-bottom-margin">
        <nav role="navigation">
          <h2 className="list-title">Contents</h2>
          <ol className="govuk-list">
            <li className="content-list-item">
              <a
                href="#lab-facilities"
                className="govuk-link content-list-item-link"
              >
                Lab facilities
              </a>
            </li>
            <li className="content-list-item">
              <a
                href="#opening-hours"
                className="govuk-link content-list-item-link"
              >
                Opening hours
              </a>
            </li>
            <li className="content-list-item">
              <Link
                to="/gds-research-labs"
                className="govuk-link content-list-item-link"
              >
                The GDS labs
              </Link>
            </li>
          </ol>
        </nav>
      </section>
      <section>
        <p className="govuk-body">
          The user research lab allows teams developing digital services to
          carry out research into their own projects and services.
        </p>
        <p className="govuk-body">The lab is at GDS’s offices.</p>
        <div className="address">
          <p className="govuk-body">
            White Chapel Building
            <br /> 10 Whitechapel High Street
            <br />
            London
            <br />
            E1 8QS
            <br />
          </p>
        </div>
      </section>
    </>
  );
};

export default Content;
