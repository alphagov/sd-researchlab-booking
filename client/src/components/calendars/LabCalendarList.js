import React from 'react';
import { Query } from 'react-apollo';

import Spinner from '../shared/Spinner';
import Error from '../../containers/Error';
import LabCalendar from './LabCalendar';

// get research lab calendars
import { GET_RESEARCH_LABS } from '../../queries';

const LabCalendarList = () => {
  return (
    <>
      <div className="govuk-grid-row">
        <div className="govuk-grid-column-full">
          <h2 className="govuk-heading-l">Lab Calendars</h2>
        </div>
      </div>
      <div className="govuk-grid-row">
        <Query query={GET_RESEARCH_LABS}>
          {({ loading, error, data }) => {
            if (loading) return <Spinner />;
            if (error) return <Error error={error} />;
            // console.log(data);
            const { success, calendars } = data.getResourceCalendarList;
            // console.log(labs);
            if (!success) {
              return <div>No lab calendars found</div>;
            }
            return calendars.map((calendar) => (
              <div
                className="govuk-grid-column-one-half"
                key={calendar.resourceId}
              >
                <LabCalendar calendar={calendar} />
              </div>
            ));
          }}
        </Query>
      </div>
    </>
  );
};

export default LabCalendarList;
