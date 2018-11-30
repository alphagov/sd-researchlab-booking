const mongoose = require('mongoose');
const chai = require('chai');

const expect = chai.expect;

const User = require('../models/User');

describe('Database Tests', () => {
  // create a sandbox database connection
  before((done) => {
    mongoose
      .connect(
        'mongodb://booking_db:27017/booking_tests',
        {
          useNewUrlParser: true,
          poolSize: 10,
          useFindAndModify: false,
          useCreateIndex: true
        }
      )
      .then(() => {
        console.log('Connected to the Test Database');
        return done();
      })
      .catch((error) =>
        console.error('unable to connect to Test Database', error)
      );
  });
});
