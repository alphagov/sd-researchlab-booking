import React from 'react';

import LabOverview from '../components/lab/LabOverview';
import Content from '../components/landing/Content';
import RelatedContent from '../components/landing/RelatedContent';
import LabInfo from '../components/lab/LabInfo';

const Landing = () => {
  return (
    <>
      <LabOverview />
      <div className="govuk-grid-row">
        <div className="govuk-grid-column-two-thirds">
          <Content />
          <LabInfo />
        </div>
        <div className="govuk-grid-column-one-third">
          <RelatedContent />
        </div>
      </div>
    </>
  );
};

export default Landing;
