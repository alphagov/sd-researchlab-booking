import { eachDay, isWeekend } from 'date-fns';

export const calcBusyPercent = async (start, end, busy) => {
  const dayArray = eachDay(start, end);
  const numDays = dayArray.length;
  let workDayCounter = 0;

  for (let i = 0; i < numDays; i++) {
    if (!isWeekend(dayArray[i])) {
      workDayCounter += 1;
    }
  }

  return Math.ceil((busy / workDayCounter) * 100);
};
