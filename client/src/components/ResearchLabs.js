import React, { Component, Fragment } from 'react';
import { Query } from 'react-apollo';
import ResearchLabCalendar from './calendars/ResearchLabCalendar';
import { GET_RESEARCH_LABS } from '../queries';

class ResearchLabs extends Component {
  renderLabCalendars(calendars) {
    return calendars.map((calendar) => (
      <div className="row" style={{ marginBottom: '50px' }}>
        <div className="two-thirds column App" key={calendar.resourceId}>
          <ResearchLabCalendar calendar={calendar} />
        </div>
      </div>
    ));
  }

  render() {
    return (
      <Fragment>
        <h2 className="App">Research Labs</h2>
        <div className="container">
          <Query query={GET_RESEARCH_LABS}>
            {({ loading, error, data }) => {
              if (loading) return <div className="App">Loading...........</div>;
              if (error) return <div>{error}</div>;
              const { success, calendars } = data.getResourceResearchLab;
              return (
                <Fragment>
                  {success ? (
                    this.renderLabCalendars(calendars)
                  ) : (
                    <div className="App">No Research Labs found</div>
                  )}
                </Fragment>
              );
            }}
          </Query>
        </div>
      </Fragment>
    );
  }
}

export default ResearchLabs;
