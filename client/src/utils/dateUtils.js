import dateFns from 'date-fns';

// export const checkExpire = (dateCreated) => {
//   const nowT = moment();
//   const regLinkDate = moment(moment.unix(dateCreated / 1000).format());
//   if (nowT.diff(regLinkDate, 'minutes') > 60) {
//     return true;
//   }
//   return false;
// };

// day functions
export const checkDay = (day) => {
  if (day > 31 || day < 1) {
    return false;
  }
  return true;
};

// month functions
export const checkMonth = (month) => {
  if (month > 12 || month < 1) {
    return false;
  }
  return true;
};

// year functions
export const checkYear = (year) => {
  if (year.length < 4) {
    return false;
  }
  if (year < dateFns.getYear(new Date())) {
    return false;
  }
  return true;
};

export const yearBuilder = (day, month, year) => {
  return dateFns.format(new Date(year, month - 1, day));
};

// date functions

export const timeInWords = (date) => {
  return dateFns.distanceInWords(date, new Date());
};

export const readableDate = (date) => {
  return dateFns.format(date, 'HH:mm Do MMM YYYY');
};

export const dateIsPast = (date) => {
  return dateFns.isPast(date);
};

export const dateIsNot48 = (date) => {
  let compDate = dateFns.addDays(new Date(), 1);
  return dateFns.isBefore(date, compDate);
};

export const dateIsMoreThan10Weeks = (date) => {
  if (
    dateFns.differenceInCalendarWeeks(date, new Date(), { weekStartsOn: 1 }) >
    10
  ) {
    return true;
  }
  return false;
};

export const dateIsWeekend = (date) => {
  return dateFns.isWeekend(date);
};

export const makeStartEnd = (date, slot) => {
  let start = '';
  let end = '';

  switch (slot) {
    case 'AM':
      start = dateFns.setMinutes(dateFns.setHours(date, 8), 30);
      end = dateFns.setHours(date, 12);
      return { start, end };

    case 'PM':
      start = dateFns.setMinutes(dateFns.setHours(date, 12), 30);
      end = dateFns.setHours(date, 17);
      return { start, end };

    case 'DAY':
      start = dateFns.setMinutes(dateFns.setHours(date, 8), 30);
      end = dateFns.setHours(date, 17);
      return { start, end };

    default:
      return { start, end };
  }
};
