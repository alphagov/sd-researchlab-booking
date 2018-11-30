const mongoose = require('mongoose');
const chai = require('chai');

const expect = chai.expect;

const User = require('../models/User');

var assert = require('assert');
describe('Array', function() {
  describe('#indexOf()', function() {
    it('should return -1 when the value is not present', function() {
      assert.equal(-1, [1, 2, 3].indexOf(4));
    });
  });
});

describe('Database Tests', function() {
  // create a sandbox database connection
  before(function(done) {
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

    describe('Test Database models', function() {
      // save a dummy user
      it('New User saved to the Database', function(done) {
        let testUser = User({
          firstName: 'John',
          lastName: 'Doe',
          email: 'john@doe.com',
          phone: '1234567',
          password: 'password'
        });
        testUser.save(done);
      });
    });
  });
  //After all tests are finished drop database and close connection
  after(function(done) {
    mongoose.connection.db.dropDatabase(() => {
      mongoose.connection.close(done);
    });
  });
});
