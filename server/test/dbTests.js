import { expect, should } from 'chai';
should();
import User from '../src/models/User';
import TwoFactor from '../src/models/Twofactor';
import Events from '../src/models/Events';

const DBTests = () => {
  describe('Database Models testing', () => {
    describe('User model', () => {
      it('Expect errors if required fields are empty', async () => {
        const U = await new User();
        U.validate((err) => {
          expect(err.errors).to.exist;
        });
      });
    });

    describe('TwoFactor model', () => {
      it('Expect errors if required fields are empty', async () => {
        const twoF = await new TwoFactor();
        twoF.validate((err) => {
          expect(err.errors).to.exist;
        });
      });
      it('The Two Factor should be an object with a date and a number', async () => {
        const newToken = await new TwoFactor({ token: 12345 });
        newToken.should.be.an('object');
        const { token, date } = newToken;
        token.should.be.a('number');
        date.should.be.a('date');
      });
    });

    describe('Events model', () => {
      it('Expect errors if required fields are empty', async () => {
        const newEvent = await new Events();
        newEvent.validate((err) => {
          expect(err.errors).to.exist;
        });
      });
    });
  });
};

export default DBTests;
