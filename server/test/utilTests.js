import {
  hashCreator,
  hashCompare,
  MFACreator,
  createUserToken,
  verifyUserToken
} from '../src/utils/cryptoUtils';

import { should } from 'chai';
should();
let testShould = should();

export const cryptoTests = () => {
  describe('Encryption Utilities Tests', () => {
    it('Should create an encrypted password without error', async () => {
      const newHash = await hashCreator('password');
      newHash.should.not.Throw;
      newHash.should.not.equal('password');
    });
    it('Should compare encrypted password with plain without error and return true', async () => {
      const newHash = await hashCreator('password');
      const newCompare = await hashCompare('password', newHash);
      newCompare.should.not.Throw;
      newCompare.should.be.a('boolean');
      newCompare.should.equal(true);
    });
  });
};

export const securityCodeTests = () => {
  describe('Security Code Tests', () => {
    it('Should return a 5 digit number without error', async () => {
      const newSecCode = await MFACreator();
      newSecCode.should.not.Throw;
      newSecCode.should.be.a('number');
    });
  });
};

export const webTokenTests = () => {
  describe('JSON Web Token Tests', () => {
    const testTkn = { id: 'test123', email: 'test123@test.com' };
    it('Should create an encrypted jwt without error', async () => {
      const newJWT = await createUserToken(testTkn, '1h');
      newJWT.should.not.Throw;
      newJWT.should.be.an('object');
      const { createSuccess, newToken } = newJWT;
      createSuccess.should.equal(true);
      newToken.should.be.a('string');
      testShould.not.exist(newJWT.error);
    });
    it('Should veryify an encrypted token without error', async () => {
      const newJWT = await createUserToken(testTkn, '1h');
      const veriToken = await verifyUserToken(newJWT.newToken, '1h');
      veriToken.should.not.Throw;
      veriToken.should.be.an('object');
      const { verifySuccess, clearToken } = veriToken;
      verifySuccess.should.equal(true);
      clearToken.should.be.an('object');
      clearToken.id.should.equal(testTkn.id);
      clearToken.sub.should.equal(testTkn.email);
    });
  });
};
