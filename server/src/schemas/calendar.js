import { gql } from 'apollo-server';

export const typeDef = gql`
  type ResourceCalendar {
    resourceId: String
    resourceName: String
    resourceType: String
    resourceDescription: String
    resourceEmail: String
    resourceCategory: String
    capacity: Int
    buildingId: String
    building: ResourceBuilding
    floorName: String
  }

  type ResearchLab {
    resourceId: String
    resourceName: String
    resourceType: String
    resourceDescription: String
    resourceEmail: String
    resourceCategory: String
    capacity: Int
    buildingId: String
    building: ResourceBuilding
    freeBusy: [Busy]
    floorName: String
  }

  type BookedEvent {
    eventId: String
    resource: ResourceCalendar
    eventTitle: String
    eventDescription: String
    eventStatus: String
    eventStart: String
    eventEnd: String
    eventOwner: EventCreator
  }

  type BookedEventsUser {
    success: Boolean
    reason: String
    events: [BookedEvent]
  }

  type ResearchLabEvent {
    success: Boolean
    reason: String
    event: BookedEvent
  }

  type EventCreator {
    displayName: String
    email: String
  }

  type ResearchLabList {
    success: Boolean
    labs: [ResearchLab]
  }

  type ResourceCalendarList {
    success: Boolean
    calendars: [ResourceCalendar]
  }

  type CalendarList {
    items: [CalendarIds]
  }

  type CalendarIds {
    id: String
  }

  type CalendarFreeBusy {
    resourceId: String
    busy: [Busy]
  }

  type CalendarFreeBusyList {
    success: Boolean
    calendars: [CalendarFreeBusy]
  }

  type Busy {
    title: String
    start: String
    end: String
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

  extend type Query {
    getResourceCalendarList: ResourceCalendarList
    getResourceBuildingList: ResourceBuildingList
    getResourceBuilding(buildingId: String!): ResourceBuilding
    getResourceResearchLab: ResearchLabList
    getCalendarFreeBusyList(
      start: String!
      end: String!
      items: [String!]
    ): CalendarFreeBusyList
    getBookedEventsUser: BookedEventsUser
  }

  extend type Mutation {
    addResearchLabEvent(
      calendarId: String!
      start: String!
      end: String!
      attendees: Int
      title: String!
      description: String
      creator: String!
      email: String!
    ): ResearchLabEvent
  }
`;
