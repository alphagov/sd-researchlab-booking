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
    floorNames: [Floor]
    coordinates: Coords
  }

  type Floor {
    name: String
  }

  type ResourceBuildingList {
    success: Boolean
    buildings: [ResourceBuilding]
  }

  type Query {
    getResourceCalendarList: ResourceCalendarList
    getResourceBuildingList: ResourceBuildingList
  }

  type Coords {
    latitude: Float
    longitude: Float
  }
`;

export default typeDefs;
