import RegToken from '../../models/RegToken';
import moment from 'moment';

export const addNewRegLink = async ({ userId, regToken }) => {
  try {
    const newRegLink = await new RegToken({
      userId,
      regToken
    }).save();

    return newRegLink;
  } catch (error) {
    console.log(error);
    return { error };
  }
};

export const getRegLink = async ({ regToken }) => {
  try {
    const regTokenFull = await RegToken.findOne({ regToken });
    return regTokenFull;
  } catch (error) {
    return error;
  }
};

export const checkRegLink = async (regLinkId) => {
  const regToken = await RegToken.findById(regLinkId);
  console.log(regToken);
  const nowT = moment();
  const regLinkDate = moment(moment(regToken.dateCreated).format());
  if (nowT.diff(regLinkDate, 'minutes') > 60) {
    return true;
  }
  return false;
};
