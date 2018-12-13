import { hash } from 'bcrypt';

const LinkCreator = async (email) => {
  try {
    const linkHash = await hash(email, 12);
    return linkHash;
  } catch (error) {
    return error;
  }
};

export default LinkCreator;
