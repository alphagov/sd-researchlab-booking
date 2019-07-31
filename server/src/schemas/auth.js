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

  extend type Mutation {
    registerNewUser(
      firstName: String!
      lastName: String!
      email: String!
      phone: String!
    ): User
  }
`;
