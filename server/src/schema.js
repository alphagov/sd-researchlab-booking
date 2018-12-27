import { gql } from 'apollo-server';

const typeDefs = gql`
  type ResourceCalendar {
    resourceId: String
    resourceName: String
    resourceType: String
    resourceDescription: String
    resourceEmail: String
    resourceCategory: String
    capacity: Int
    buildingId: String
    floorName: String
  }

  type ResourceCalendarList {
    success: Boolean
    calendars: [ResourceCalendar]
  }

  type ResourceBuilding {
    buildingId: String
    buildingName: String
    description: String
    floorNames: [String]
    coordinates: Coords
  }

  type Coords {
    latitude: Float
    longitude: Float
  }

  type ResourceBuildingList {
    success: Boolean
    buildings: [ResourceBuilding]
  }

  type Query {
    getResourceCalendarList: ResourceCalendarList
    getResourceBuildingList: ResourceBuildingList
    getResourceResearchLab: ResourceCalendarList
  }
`;

export default typeDefs;
