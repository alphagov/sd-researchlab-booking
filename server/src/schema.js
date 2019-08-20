import { makeExecutableSchema, gql } from 'apollo-server-express';

import { typeDef as Auth } from './schemas/auth';
import { typeDef as Calendar } from './schemas/calendar';
import resolvers from './resolvers';

const mainType = gql`
  type Query {
    _empty: String
  }
  type Mutation {
    _empty: String
  }
`;

const rlabsSchema = makeExecutableSchema({
  typeDefs: [mainType, Auth, Calendar],
  resolvers
});

export default rlabsSchema;
