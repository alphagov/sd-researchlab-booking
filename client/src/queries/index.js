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
      _id
      ok
      error
    }
  }
`;

// export const CONFIRM_REGISTRATION = gql`
// mutation
// `

export const GET_REG_TOKEN = gql`
  query($regToken: String!) {
    getRegToken(regToken: $regToken) {
      _id
      userId
      regToken
      createdAt
    }
  }
`;
