import { gql } from 'apollo-boost';

export const GET_RESEARCH_LABS = gql`
  query {
    getResourceCalendarList {
      success
      calendars {
        resourceId
        resourceName
        resourceEmail
        resourceType
        floorName
        building {
          buildingName
          description
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
  query($regToken: String!) {
    checkRegToken(regToken: $regToken) {
      _id
      ok
      error
    }
  }
`;

export const CHECK_USER_VERIFIED = gql`
  query($_id: ID!) {
    checkUserVerified(_id: $_id) {
      _id
      ok
      error
    }
  }
`;

export const RESEND_REG_LINK = gql`
  mutation($_id: ID!) {
    resendRegLink(_id: $_id) {
      _id
      ok
      error
    }
  }
`;

export const SEND_2FA_CODE = gql`
  mutation($_id: ID!) {
    send2FACode(_id: $_id) {
      _id
      ok
      error
    }
  }
`;

export const ENTER_2FA_CODE = gql`
  mutation($_id: ID!, $mfaCode: String!) {
    enter2FACode(_id: $_id, mfaCode: $mfaCode) {
      _id
      ok
      error
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
    registerUser(
      firstName: $firstName
      lastName: $lastName
      email: $email
      phone: $mobilePhone
      password: $password
    ) {
      _id
      ok
      error
    }
  }
`;
