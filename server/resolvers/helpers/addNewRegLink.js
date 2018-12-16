import RegToken from '../../models/RegToken';

const addNewRegLink = async ({ email, regToken }) => {
  try {
    const newRegLink = await new RegToken({
      email,
      regToken
    }).save();

    return newRegLink;
  } catch (error) {
    console.log(error);
    return { error };
  }
};

export default addNewRegLink;
