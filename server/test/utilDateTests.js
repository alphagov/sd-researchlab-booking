import { should } from 'chai';
should();

import { addDays, startOfWeek } from 'date-fns';

import { calcBusyPercent } from '../src/utils/dateUtils';

const startDate = startOfWeek(Date.now(), { weekStartsOn: 1 });
const endDate = addDays(startDate, 27);

export const utilDateTests = () => {
  describe('Calendar Busy percentage calculations', () => {
    it('Should return a percentage of busy days as a number', async () => {
      const newPerc = await calcBusyPercent(startDate, endDate, 10);
      newPerc.should.be.a('number');
      newPerc.should.equal(50);
    });
  });
};
