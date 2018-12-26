import Express from 'express';
import { connect, Types } from 'mongoose';
import { ApolloServer } from 'apollo-server-express';
import Helmet from 'helmet';
import Morgan from 'morgan';

import User from './models/User';
import RegToken from './models/RegToken';

import ResourceCalendarAPI from './datasources/google/resourceCalendars';

import typeDefs from './schema';
import resolvers from './resolvers';

const { ObjectId } = Types;
ObjectId.prototype.valueOf = function() {
  return this.toString();
};

const apollo = new ApolloServer({
  typeDefs,
  resolvers,
  dataSources: () => ({
    resourceCalendarAPI: new ResourceCalendarAPI()
  }),
  context: ({ req, res }) => ({ User, RegToken, currentUser: req.currentUser })
});

// connect to the database
connect(
  process.env.MONGODB_URI,
  {
    useNewUrlParser: true,
    poolSize: 10,
    useFindAndModify: false,
    useCreateIndex: true
  }
)
  .then(() => console.log('Database connected'))
  .catch((error) => console.error('Unable to connect to database', error));

const app = Express();

// logging for dev only
app.use(Morgan('dev'));
// security
app.use(Helmet());
// app.use(async (req, res, next) => {
//   const token = req.headers.authorization;
//   if (token !== null || token !== undefined) {
//     try {
//       const currentUser = await verify(token, process.env.SECRET);
//       req.currentUser = currentUser;
//     } catch (error) {
//       console.log(error);
//     }
//   }
//   next();
// });
apollo.applyMiddleware({ app });

const PORT = process.env.PORT || 4050;

app.listen(PORT, () => {
  console.log(
    `Server started on PORT: ${PORT}`,
    `GraphQL on ${apollo.graphqlPath}`
  );
});

export default app;
