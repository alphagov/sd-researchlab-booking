import { hash } from 'bcrypt';
import { sign } from 'jsonwebtoken';

export const hashCreator = async (term) => {
  try {
    const hashTerm = await hash(term, 12);
    return hashTerm;
  } catch (error) {
    return { error };
  }
};

export const createToken = (user, expiresIn) => {
  const { firstName, lastName, email } = user;
  return sign({ firstName, lastName, email }, process.env.SECRET, {
    expiresIn
  });
};
