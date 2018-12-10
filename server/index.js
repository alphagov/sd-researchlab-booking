import Express from 'express';
import { connect, Types } from 'mongoose';
import { ApolloServer } from 'apollo-server-express';
import Helmet from 'helmet';
import Passport from 'passport';
import Morgan from 'morgan';

import typeDefs from './schema';

const { ObjectId } = Types;
ObjectId.prototype.valueOf = function() {
  return this.toString();
};

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

const App = Express();

// logging for dev only
App.use(Morgan('dev'));

App.use(Helmet());

const PORT = process.env.PORT || 4050;

App.listen(PORT, () => {
  console.log(`Server started on PORT: ${PORT}`);
});

export default App;
