import dateFns from 'date-fns';

// export const checkExpire = (dateCreated) => {
//   const nowT = moment();
//   const regLinkDate = moment(moment.unix(dateCreated / 1000).format());
//   if (nowT.diff(regLinkDate, 'minutes') > 60) {
//     return true;
//   }
//   return false;
// };
export const checkDay = (day) => {
  if (day > 31 || day < 1) {
    return false;
  }
  return true;
};

export const checkMonth = (month) => {
  if (month > 12 || month < 1) {
    return false;
  }
  return true;
};

export const checkYear = (year) => {
  if (year.length < 4) {
    return false;
  }
  if (year < dateFns.getYear(new Date())) {
    return false;
  }
  return true;
};
