import React, { Component, Fragment } from 'react';
import { Query } from 'react-apollo';
import ResearchLabCalendar from './calendars/ResearchLabCalendar';
import { GET_RESEARCH_LABS } from '../queries';
import styles from './ResearchLabs.module.css';

class ResearchLabs extends Component {
  renderLabCalendars(labs) {
    return labs.map((calendar) => (
      <div key={calendar.resourceId}>
        <ResearchLabCalendar calendar={calendar} />
      </div>
    ));
  }

  render() {
    return (
      <div className={styles.container}>
        <h2>Research Labs</h2>
        <Fragment>
          <Query query={GET_RESEARCH_LABS}>
            {({ loading, error, data }) => {
              if (loading) return <div>Loading...........</div>;
              if (error) return <div>{error}</div>;
              const { success, labs } = data.getResourceResearchLab;
              return (
                <div className={styles.calwrapper}>
                  {success ? (
                    this.renderLabCalendars(labs)
                  ) : (
                    <div>No Research Labs found</div>
                  )}
                </div>
              );
            }}
          </Query>
        </Fragment>
      </div>
    );
  }
}

export default ResearchLabs;
