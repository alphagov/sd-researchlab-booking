import { gql } from 'apollo-server';

const typeDefs = gql`
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
    epicImageList(date: String): EpicImageResults
    testRes(name: String): TestRes
  }

  type TestRes {
    message: String
  }

  type EpicImageResults {
    success: Boolean
    results: [EpicImage]
  }

  type EpicImage {
    identifier: String
    caption: String
    image: String
    date: String
    coords: Coords
    sat_pos: Position
    image_locations: ImageLocations
  }

  type Coords {
    lat: Float
    lon: Float
  }

  type Position {
    x: Float
    y: Float
    z: Float
  }

  type ImageLocations {
    thumb: String
    jpg: String
    png: String
  }
`;

export default typeDefs;
