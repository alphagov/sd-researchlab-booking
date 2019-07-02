import React from 'react';

const RelatedContent = () => {
  return (
    <div className="related-content">
      <h3 className="govuk-heading-m align-left">Related content</h3>
      <nav role="navigation">
        <h3 className="nav-sub-heading">Detailed guidance</h3>
        <ul className="related-links-list">
          <li className="related-links-list-item">
            <a
              href="https://www.gov.uk/guidance/how-to-run-a-session-at-the-gds-user-research-lab"
              className="govuk-link content-list-item-link"
            >
              How to run a session at the GDS user research lab
            </a>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default RelatedContent;
