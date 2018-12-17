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
    textCode: Int
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
    getRegToken(regToken: String!): RegToken
  }

  type Mutation {
    registerUser(
      firstName: String!
      lastName: String!
      email: String!
      phone: String!
      password: String!
    ): RegResult
  }
`;

export default userDefs;
