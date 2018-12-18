import { gql } from 'apollo-boost';

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

export const RESEND_REG_LINK = gql`
  mutation($_id: ID!) {
    resendRegLink(_id: $_id) {
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
    $phone: String!
    $password: String!
  ) {
    registerUser(
      firstName: $firstName
      lastName: $lastName
      email: $email
      phone: $phone
      password: $password
    ) {
      _id
      ok
      error
    }
  }
`;
