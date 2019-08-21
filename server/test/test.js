import DBTests from './dbTests';
import { cryptoTests, securityCodeTests } from './utilTests';

describe('Database tests', () => {
  DBTests();
});

describe('Utility tests', () => {
  cryptoTests();
  securityCodeTests();
});
