import { expect } from 'chai';
import User from '../models/User';
import Token from '../models/Token';

const DBTests = () => {
  describe('Database Models testing', () => {
    describe('User model', () => {
      it('Expect errors if Required fields are empty', (done) => {
        const U = new User();
        U.validate((err) => {
          expect(err.errors).to.exist;
          done();
        });
      });
    });

    describe('Token model', () => {
      it('Expect errors if Required fields are empty', (done) => {
        const T = new Token();
        T.validate((err) => {
          expect(err.errors).to.exist;
          done();
        });
      });
    });
  });
};

export default DBTests;
