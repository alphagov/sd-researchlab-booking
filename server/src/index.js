import Express from 'express';
import { connect, Types } from 'mongoose';
import { ApolloServer } from 'apollo-server-express';
import Helmet from 'helmet';
import Morgan from 'morgan';

import GoogleResourcesAPI from './datasources/google/googleResources';

import typeDefs from './schemas';
import resolvers from './resolvers';

const { ObjectId } = Types;
ObjectId.prototype.valueOf = function() {
  return this.toString();
};

const apollo = new ApolloServer({
  typeDefs,
  resolvers,
  dataSources: () => ({
    googleResourcesAPI: new GoogleResourcesAPI()
  }),
  context: ({ req }) => ({ authScope: getScope(req.headers.authorization) }),
  playground: {
    settings: {
      'editor.theme': 'light'
    }
  }
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
