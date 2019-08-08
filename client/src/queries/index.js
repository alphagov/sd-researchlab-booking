import gql from 'graphql-tag';

export const GET_RESEARCH_LABS = gql`
  query {
    getResourceCalendarList {
      success
      calendars {
        resourceId
        resourceName
        resourceEmail
        capacity
        floorName
        building {
          buildingName
        }
      }
    }
  }
`;

export const GET_RESEARCH_LABS_FREEBUSY = gql`
  query {
    getResourceResearchLab {
      success
      labs {
        resourceName
        resourceEmail
        freeBusy {
          start
          end
        }
      }
    }
  }
`;

export const GET_CALENDAR_FREE_BUSY = gql`
  query($start: String!, $end: String!, $items: [String!]) {
    getCalendarFreeBusyList(start: $start, end: $end, items: $items) {
      success
      calendars {
        resourceId
        busy {
          title
          start
          end
        }
      }
    }
  }
`;

export const GET_BOOKED_EVENTS_BY_USER = gql`
  query {
    getBookedEventsUser {
      success
      reason
      events {
        eventId
        eventTitle
        eventDescription
        eventStatus
        eventStart
        eventEnd
        eventOwner {
          displayName
          email
        }
        resource {
          resourceName
          building {
            buildingName
            description
          }
        }
      }
    }
  }
`;

export const GET_CURRENT_USER = gql`
  query {
    getCurrentUser {
      firstName
      lastName
      email
    }
  }
`;

export const CHECK_REG_TOKEN = gql`
  query($token: String!) {
    registerTokenCheck(token: $token) {
      success
      token
      user {
        id
        firstName
        lastName
      }
    }
  }
`;

export const CHECK_USER_VERIFIED = gql`
  query {
    checkUserVerified {
      success
    }
  }
`;

export const ENTER_2FA_CODE = gql`
  query($mfaCode: Int!) {
    enter2FACode(mfaCode: $mfaCode) {
      success
      reason
      user {
        id
        isVerified
        firstName
        lastName
      }
    }
  }
`;

export const RESEND_2FA_CODE = gql`
  query {
    resend2FACode {
      success
      reason
    }
  }
`;

export const USER_SIGN_IN = gql`
  query($email: String!, $password: String) {
    signInUser(email: $email, password: $password) {
      success
      token
      user {
        id
        isVerified
      }
    }
  }
`;

export const RESEND_REG_LINK = gql`
  query($id: ID!) {
    registerLinkResend(id: $id) {
      success
      token
    }
  }
`;

export const REGISTER_USER = gql`
  mutation(
    $firstName: String!
    $lastName: String!
    $email: String!
    $mobilePhone: String!
    $password: String!
  ) {
    registerNewUser(
      firstName: $firstName
      lastName: $lastName
      email: $email
      phone: $mobilePhone
      password: $password
    ) {
      success
      user {
        id
      }
      token
    }
  }
`;

export const BOOK_LAB_SLOT = gql`
  mutation(
    $calendarId: String!
    $start: String!
    $end: String!
    $attendees: Int
    $title: String!
    $description: String!
    $creator: String!
    $email: String!
  ) {
    addResearchLabEvent(
      calendarId: $calendarId
      start: $start
      end: $end
      attendees: $attendees
      title: $title
      description: $description
      creator: $creator
      email: $email
    ) {
      success
      reason
      event {
        eventId
        eventTitle
        eventDescription
        eventStatus
        eventStart
        eventEnd
        eventOwner {
          displayName
          email
        }
      }
    }
  }
`;
