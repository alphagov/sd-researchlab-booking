import DBTests from './dbTests';
import {
  cryptoTests,
  securityCodeTests,
  webTokenTests
} from './utilCryptoTests';

import { utilDateTests } from './utilDateTests';

describe('Database tests', () => {
  DBTests();
});

describe('Crypto Utility tests', () => {
  cryptoTests();
  securityCodeTests();
  webTokenTests();
});

describe('Date Utility Tests', () => {
  utilDateTests();
});
