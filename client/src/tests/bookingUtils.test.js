// create some dummy info
import { setHours, addDays } from 'date-fns';

import { checkClashDates } from '../utils/bookingUtils';

const mainStartAM = setHours(Date.now(), 8);
const mainEndAM = setHours(mainStartAM, 12);

const mainStartPM = setHours(Date.now(), 13);
const mainEndPM = setHours(mainStartPM, 17);

const mainStartDay = mainStartAM;
const mainEndDay = mainEndPM;

// build a fake free/busy

const busy1 = [
  { start: mainStartAM, end: mainEndAM },
  { start: addDays(mainStartAM, 2), end: addDays(mainEndAM, 2) },
  { start: addDays(mainStartPM, 3), end: addDays(mainEndPM, 3) },
  { start: addDays(mainStartDay, 4), end: addDays(mainEndDay, 4) }
];

const busy2 = [
  { start: mainStartPM, end: mainEndPM },
  { start: addDays(mainStartAM, 1), end: addDays(mainEndAM, 1) },
  { start: addDays(mainStartPM, 2), end: addDays(mainEndPM, 2) },
  { start: addDays(mainStartDay, 3), end: addDays(mainEndDay, 3) }
];

const lab1 = {
  resourceName: 'Test Lab 1',
  resourceEmail: 'lab1@test.com',
  freeBusy: busy1
};

const lab2 = {
  resourceName: 'Test Lab 2',
  resourceEmail: 'lab2@test.com',
  freeBusy: busy2
};

const bookingDetails = {
  bookedDate: Date.now()
};

describe('Booking Utils Test', () => {
  describe('Check If the date clashes', () => {
    it('Returns an array with a length of 2', async () => {
      const clashDate = await checkClashDates([lab1, lab2], bookingDetails);
      expect(clashDate.length).toEqual(2);
    });
  });
});
