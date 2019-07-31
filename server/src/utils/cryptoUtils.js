import { hash } from 'bcrypt';
import { sign, verify } from 'jsonwebtoken';
import fs from 'fs';
import path from 'path';

const publicKey = fs.readFileSync(
  path.join(__dirname, '../keys/tokenPublic.key'),
  'utf8'
);

const privateKey = fs.readFileSync(
  path.join(__dirname, '../keys/tokenPrivate.key'),
  'utf8'
);

const {
  TOKEN_ISSUER,
  TOKEN_AUDIENCE,
  REG_TOKEN_EXPIRES,
  USER_TOKEN_EXPIRES,
  TOKEN_ALGORITHM
} = process.env;

const numberRange = '123456789';

export const MFACreator = () => {
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

export const createRegToken = async ({ id, email }) => {
  const payload = { id };
  const signOptions = {
    issuer: TOKEN_ISSUER,
    subject: email,
    audience: TOKEN_AUDIENCE,
    expiresIn: REG_TOKEN_EXPIRES,
    algorithm: TOKEN_ALGORITHM
  };

  const token = await sign(payload, privateKey, signOptions);
  console.log('reg token', token);
  return token;
};

export const createUserToken = async ({ id, email }) => {
  const payload = { id };
  const signOptions = {
    issuer: TOKEN_ISSUER,
    subject: email,
    audience: TOKEN_AUDIENCE,
    expiresIn: USER_TOKEN_EXPIRES,
    algorithm: TOKEN_ALGORITHM
  };

  const token = await sign(payload, privateKey, signOptions);
  console.log('user token', token);
  return token;
};

export const verifyUserToken = async (token) => {
  const verifyOptions = {
    issuer: TOKEN_ISSUER,
    audience: TOKEN_AUDIENCE,
    expiresIn: USER_TOKEN_EXPIRES,
    algorithm: [TOKEN_ALGORITHM]
  };
  const legitToken = await verify(token, publicKey, verifyOptions);
  console.log('legit user', legitToken);
  return legitToken;
};

export const verifyRegToken = async (token) => {
  const verifyOptions = {
    issuer: TOKEN_ISSUER,
    // subject: email,
    audience: TOKEN_AUDIENCE,
    expiresIn: REG_TOKEN_EXPIRES,
    algorithm: [TOKEN_ALGORITHM]
  };
  const legitToken = await verify(token, publicKey, verifyOptions);
  console.log('legit reg', legitToken);
  return legitToken;
};
