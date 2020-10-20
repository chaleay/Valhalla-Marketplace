//validate our token
import jwt from 'jsonwebtoken';
import User from '../models/userModel.js';
import asyncHandler from 'express-async-handler';

const protect = asyncHandler(async (req, res, next) => {
  let token;
  //console.log('hello from auth middleWare');

  //if there is a valid header and that header is followed by valid token
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    try {
      token = req.headers.authorization.split(' ')[1];
      //retrieve mongoDB id of user object through verifying the token with jwt library
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = await User.findById(decoded.id).select('-password');
      next();
    } catch (error) {
      console.error(error);
      res.status(401);
      throw new Error('Token has failed, not authorized.');
    }
  }

  if (!token) {
    res.status(401);
    throw new Error('Not authorized, your token is invalid');
  }
});

export { protect };
