import moment from 'moment';

export const checkExpire = (dateCreated) => {
  const nowT = moment();
  const regLinkDate = moment(moment.unix(dateCreated / 1000).format());
  if (nowT.diff(regLinkDate, 'minutes') > 60) {
    return true;
  }
  return false;
};
