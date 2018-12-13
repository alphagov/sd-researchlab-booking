import { Router } from 'express';
import Token from '../models/Token';

const regRoutes = new Router();

regRoutes.get('/verify', async (req, res) => {
  const token = req.query.token;
  const regToken = await Token.find({ token });
  if (regToken) {
    console.log(regToken);
    // get user details return jwt
    // so on client if success then getCurrentUser
    // redirect to 2fa page
  } else {
    // return error and
  }
});

export default regRoutes;
