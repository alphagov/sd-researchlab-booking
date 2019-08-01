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

  type VerifiedUser {
    success: Boolean
    token: String
    user: User
  }

  extend type Query {
    registerTokenCheck(token: String!): VerifiedUser
  }

  extend type Mutation {
    registerNewUser(
      firstName: String!
      lastName: String!
      email: String!
      phone: String!
      password: String!
    ): NewUser
    registerLinkResend(id: ID!): NewUser
  }
`;
