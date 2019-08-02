import { gql } from 'apollo-server';

export const typeDef = gql`
  type User {
    id: ID!
    firstName: String
    lastName: String
    email: String
    phone: String
    isVerified: Boolean
    mfaCode: Int
  }

  type LabUser {
    success: Boolean
    token: String
    user: User
  }

  extend type Query {
    registerTokenCheck(token: String!): LabUser
  }

  extend type Mutation {
    registerNewUser(
      firstName: String!
      lastName: String!
      email: String!
      phone: String!
      password: String!
    ): LabUser
    registerLinkResend(id: ID!): LabUser
    signInUser(email: String!, password: String): LabUser
  }
`;
