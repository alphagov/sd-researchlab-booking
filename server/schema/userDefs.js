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
    regToken: String!
    email: String!
    createdAt: String
  }

  type Token {
    token: String!
  }

  type RegResult {
    ok: Boolean!
    error: String
  }

  type Query {
    getCurrentUser: User
  }

  type Mutation {
    registerUser(
      firstName: String!
      lastName: String!
      email: String!
      phone: String!
      password: String!
    ): RegResult

    getRegToken(regToken: String!): RegToken
  }
`;

export default userDefs;
