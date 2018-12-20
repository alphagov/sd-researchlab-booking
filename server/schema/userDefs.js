import { gql } from 'apollo-server';

const userDefs = gql`
  type User {
    _id: ID
    firstName: String!
    lastName: String!
    email: String!
    phone: String!
    password: String!
    joinDate: String
    mfaCode: Int
    isVerified: Boolean
  }

  type RegToken {
    _id: ID
    userId: ID
    regToken: String!
    createdAt: String
  }

  type Token {
    token: String!
  }

  type RegResult {
    _id: String
    ok: Boolean
    error: String
  }

  type Query {
    getCurrentUser: User
    checkRegToken(regToken: String!): RegResult
    checkUserVerified(_id: ID!): RegResult
  }

  type Mutation {
    registerUser(
      firstName: String!
      lastName: String!
      email: String!
      phone: String!
      password: String!
    ): RegResult

    resendRegLink(_id: ID!): RegResult
    send2FACode(_id: ID!): RegResult
    enter2FACode(_id: ID!, mfaCode: Int!): RegResult
  }
`;

export default userDefs;
