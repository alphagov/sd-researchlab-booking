import { hash, compare } from 'bcrypt';
import { sign, verify } from 'jsonwebtoken';
import fs from 'fs';
import path from 'path';

const publicKey = fs.readFileSync(
  path.join(__dirname, '../keys/tokenPublic.key'),
  'utf-8'
);

const privateKey = fs.readFileSync(
  path.join(__dirname, '../keys/tokenPrivate.key'),
  'utf-8'
);

const { TOKEN_ISSUER, TOKEN_AUDIENCE, TOKEN_ALGORITHM } = process.env;

const numberRange = '123456789';

export const MFACreator = async () => {
  let tempMFA = '';
  for (let i = 0; i < 5; i++) {
    tempMFA += numberRange.charAt(
      Math.floor(Math.random() * numberRange.length)
    );
  }
  console.log(tempMFA);
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

export const hashCompare = async (plain, hash) => {
  try {
    const comparePassword = await compare(plain, hash);
    return comparePassword;
  } catch (error) {
    return false;
  }
};

export const createUserToken = async ({ id, email }, expiresIn) => {
  const payload = { id };
  const signOptions = {
    issuer: TOKEN_ISSUER,
    subject: email,
    audience: TOKEN_AUDIENCE,
    expiresIn: expiresIn,
    algorithm: TOKEN_ALGORITHM
  };

  try {
    const newToken = await sign(payload, privateKey, signOptions);
    return {
      createSuccess: true,
      newToken,
      error: null
    };
  } catch (error) {
    return {
      createSuccess: false,
      newToken: null,
      error
    };
  }
};

export const verifyUserToken = async (token, expiresIn) => {
  const verifyOptions = {
    issuer: TOKEN_ISSUER,
    audience: TOKEN_AUDIENCE,
    expiresIn: expiresIn,
    algorithm: [TOKEN_ALGORITHM]
  };
  try {
    const legitToken = await verify(token, publicKey, verifyOptions);
    return {
      verifySuccess: true,
      clearToken: legitToken,
      error: null
    };
  } catch (error) {
    return {
      verifySuccess: false,
      clearToken: null,
      error
    };
  }
};
