// import { Router } from 'express';
// import RegToken from '../models/RegToken';

// const regRoutes = new Router();

// regRoutes.get('/verify', async (req, res) => {
//   const token = req.query.token;
//   const regToken = await RegToken.find({ token });
//   if (regToken) {
//     console.log(regToken);
//     // get the email adress associated with this token....
//     // get user details  from User  if it exists return jwt
//     // so on client if success then getCurrentUser
//     // redirect to 2fa page
//     //  if user doesn't exist in User table redirect to registration page
//   } else {
//     // return error and redirect to request new verification email
//     // user puts in email
//   }
// });

// export default regRoutes;
