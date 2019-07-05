import React from 'react';
import { Query } from 'react-apollo';

import Spinner from '../shared/Spinner';
import LabDetails from './LabDetails';
import Error from '../../containers/Error';

import { GET_RESEARCH_LABS } from '../../queries';

const LabList = () => {
  return (
    <div className="govuk-grid-column-full">
      <h1 className="govuk-heading-xl">The GDS Labs</h1>
      <Query query={GET_RESEARCH_LABS}>
        {({ loading, error, data }) => {
          if (loading) return <Spinner />;
          if (error) return <Error error={error} />;
          // console.log(data);
          const { success, calendars } = data.getResourceCalendarList;
          // console.log(labs);
          if (!success) {
            return <div>No labs found</div>;
          }
          return calendars.map((lab) => (
            <LabDetails key={lab.resourceId} lab={lab} />
          ));
        }}
      </Query>
    </div>
  );
};

export default LabList;
