const express = require('express');
const mongoose = require('mongoose');
const helmet = require('helmet');
const passport = require('passport');

const morgan = require('morgan');

const keys = require('./config/keys');

// connect to the database
mongoose
  .connect(
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

const app = express();

// logging for dev only
app.use(morgan('dev'));

app.use(helmet());

const PORT = process.env.PORT || 4050;

app.listen(PORT, () => {
  console.log(`Server started on PORT: ${PORT}`);
});

module.exports = app;
