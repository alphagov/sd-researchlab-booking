import RegToken from '../../models/RegToken';

const addNewRegLink = async ({ userId, regToken }) => {
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

export default addNewRegLink;
