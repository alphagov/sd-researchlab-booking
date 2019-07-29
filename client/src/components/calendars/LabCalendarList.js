import React from 'react';
import { Query } from 'react-apollo';

import Spinner from '../shared/Spinner';
import Error from '../../containers/Error';
import LabCalendar from './LabCalendar';

// get research lab calendars
import { GET_RESEARCH_LABS_FREEBUSY } from '../../queries';

const LabCalendarList = () => {
  return (
    <div className="govuk-grid-row">
      <Query query={GET_RESEARCH_LABS_FREEBUSY} pollInterval={60000}>
        {({ loading, error, data }) => {
          if (loading) return <Spinner />;
          if (error) return <Error error={error} />;
          const { success, labs } = data.getResourceResearchLab;
          if (!success) {
            return <div>No lab calendars found</div>;
          }
          return labs.map((lab) => (
            <div className="govuk-grid-column-one-half" key={lab.resourceEmail}>
              <LabCalendar lab={lab} />
            </div>
          ));
        }}
      </Query>
    </div>
  );
};

export default LabCalendarList;
