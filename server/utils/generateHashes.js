import { hash } from 'bcrypt';

const HashCreator = async (term) => {
  try {
    const hashTerm = await hash(term, 12);
    return hashTerm;
  } catch (error) {
    return error;
  }
};

export default HashCreator;
