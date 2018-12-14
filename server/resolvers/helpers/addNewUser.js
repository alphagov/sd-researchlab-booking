import User from '../../models/User';

const addNewUser = async ({ firstName, lastName, email, phone, password }) => {
  try {
    const newUser = await new User({
      firstName,
      lastName,
      email,
      phone,
      password
    }).save();
    return newUser;
  } catch (error) {
    console.log(error);
    return { error };
  }
};

export default addNewUser;
