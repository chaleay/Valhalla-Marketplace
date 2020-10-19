import express from 'express';
//using a middleware framework for handling async try...catch blocks
const router = express.Router();
import {
  authUser,
  getUserProfile,
  registerUser,
} from '../controllers/userController.js';
import { protect } from '../middleware/authMiddleware.js';

router.post('/login', authUser);
//middleware is first arg
router.route('/profile').get(protect, getUserProfile);
router.route('/').post(registerUser);

export default router;
