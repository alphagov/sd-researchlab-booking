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

  type Query {
    getCurrentUser: User
    getRegToken: RegToken
  }

  type Mutation {
    registerUser(
      firstName: String!
      lastName: String!
      email: String!
      phone: String!
      password: String!
    ): Token

    getRegToken(regToken: String!): RegToken
  }
`;

export default userDefs;
