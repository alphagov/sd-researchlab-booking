import React from 'react';
import { Query } from 'react-apollo';

import Spinner from '../shared/Spinner';
import LabDetails from './LabDetails';
import Error from '../../containers/Error';

import { GET_RESEARCH_LABS } from '../../queries';

const LabList = () => {
  return (
    <div className="govuk-grid-column">
      <h1 className="govuk-heading-xl">The GDS Labs</h1>
      <Query query={GET_RESEARCH_LABS}>
        {({ loading, error, data }) => {
          if (loading) return <Spinner />;
          const { success, labs } = data.getResourceResearchLab;
          console.log(labs);
          if (!success) {
            return <div>No labs found</div>;
          }
          return labs.map((lab) => <LabDetails key={lab.resourceId} />);
        }}
      </Query>
    </div>
  );
};

export default LabList;
