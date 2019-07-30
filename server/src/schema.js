import { makeExecutableSchema } from 'apollo-server-express';

import { typeDef as Auth } from './schemas/auth';
import { typeDef as Calendar } from './schemas/calendar';
import resolvers from './resolvers';

const rlabsSchema = makeExecutableSchema({
  typeDefs: [Auth, Calendar],
  resolvers
});

export default rlabsSchema;
