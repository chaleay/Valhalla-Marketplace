import express from 'express';
//using a middleware framework for handling async try...catch blocks
const router = express.Router();
import { protect } from '../middleware/authMiddleware.js';
import {
  addOrderItems,
  getOrderById,
  updateOrderToPaid,
} from '../controllers/orderController.js';

// @desc Fetch all products
// /api/products/
router.route('/').post(protect, addOrderItems);
//update route  for pay information on existing order
router.route('/:id/pay').put(protect, updateOrderToPaid);

//make sure these are at the bottom
router.route('/:id').get(protect, getOrderById);

export default router;
