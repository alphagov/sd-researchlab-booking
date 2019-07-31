import { gql } from 'apollo-server';

export const typeDef = gql`
  type User {
    id: ID!
    firstName: String
    lastName: String
    email: String
    phone: String
    verified: Boolean
  }

  type NewUser {
    success: Boolean
    token: String
    user: User
  }

  extend type Mutation {
    registerNewUser(
      firstName: String!
      lastName: String!
      email: String!
      phone: String!
      password: String!
    ): NewUser
  }
`;
