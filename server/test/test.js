import DBTests from './dbTests';
import { cryptoTests, securityCodeTests, webTokenTests } from './utilTests';

describe('Database tests', () => {
  DBTests();
});

describe('Utility tests', () => {
  cryptoTests();
  securityCodeTests();
  webTokenTests();
});
