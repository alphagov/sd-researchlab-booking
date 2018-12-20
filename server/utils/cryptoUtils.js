import { hash } from 'bcrypt';
import { sign } from 'jsonwebtoken';

const numberRange = '123456789';

export const MFACreator = () => {
  let tempMFA = '';
  for (let i = 0; i < 5; i++) {
    tempMFA += numberRange.charAt(
      Math.floor(Math.random() * numberRange.length)
    );
  }
  return tempMFA;
};

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
