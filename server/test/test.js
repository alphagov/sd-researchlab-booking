import { expect } from 'chai';
import User from '../models/User';

describe('User model test', () => {
  it('should be invalid if firstName is empty', (done) => {
    const U = new User();
    U.validate((err) => {
      expect(err.errors.firstName).to.exist;
      done();
    });
  });
});
