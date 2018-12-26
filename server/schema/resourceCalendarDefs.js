import { gql } from 'apollo-server';
import { makeExecutableSchema } from 'graphql-tools';

const resourceCalendarDefs = gql`
  type ResourceCalendar {
    resourceId: String
    resourceName: String
    resourceType: String
    resourceDescription: String
    resourceEmail: String
    resourceCategory: String
  }

  type ResourceCalendarList {
    success: Boolean
    calendars: [ResourceCalendar]
  }

  type Query {
    getResourceCalendarList: ResourceCalendarList
  }
`;

export default resourceCalendarDefs;
