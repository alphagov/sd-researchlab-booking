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
      regresult
    }
  }
`;

export const GET_REG_TOKEN = gql`
  mutation($regToken: String!) {
    getRegToken(regToken: $regToken) {
      email
      regToken
      createdAt
    }
  }
`;
