import { expect } from 'chai';
import User from '../models/User';
import Events from '../models/Events';

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

    describe('Events model', () => {
      it('Expect errors if Required fields are empty', (done) => {
        const E = new Events();
        E.validate((err) => {
          expect(err.errors).to.exist;
          done();
        });
      });
    });
  });
};

export default DBTests;
