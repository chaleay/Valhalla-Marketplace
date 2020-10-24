import express from 'express';
//using a middleware framework for handling async try...catch blocks
const router = express.Router();
import {
  authUser,
  getUserProfile,
  registerUser,
  updateUserProfile,
  getUsers,
  deleteUserAdmin,
  getUserById,
  updateUserAdmin,
} from '../controllers/userController.js';
import { protect, admin } from '../middleware/authMiddleware.js';

//admin middleware
router.route('/').post(registerUser).get(protect, admin, getUsers);
router.post('/login', authUser);
//middleware is first arg
//get request is to retrieve userProfile, put request is to update
router
  .route('/profile')
  .get(protect, getUserProfile)
  .put(protect, updateUserProfile);

//user deletion
router
  .route('/:id')
  .delete(protect, admin, deleteUserAdmin)
  .get(protect, admin, getUserById)
  .put(protect, admin, updateUserAdmin);

export default router;
