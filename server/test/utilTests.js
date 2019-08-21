import { hashCreator, hashCompare, MFACreator } from '../src/utils/cryptoUtils';

export const cryptoTests = () => {
  describe('Encryption Utilities Test', () => {
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
  describe('Security Code Test', () => {
    it('Should return a 5 digit number without error', async () => {
      const newSecCode = await MFACreator();
      newSecCode.should.not.Throw;
      newSecCode.should.be.a('number');
    });
  });
};
