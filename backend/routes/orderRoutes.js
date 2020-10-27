import express from 'express';
//using a middleware framework for handling async try...catch blocks
const router = express.Router();
import { protect, admin } from '../middleware/authMiddleware.js';
import {
  addOrderItems,
  getOrderById,
  updateOrderToPaid,
  updateOrderToDelivered,
  getMyOrders,
  getOrders,
  deleteOrder,
} from '../controllers/orderController.js';

//BACKEND BASICS FOR EXPRESS
//ADD ROUTE HERE, THEN DEFINE METHOD IN BACKEND

// @desc Fetch all products
// /api/products/
router.route('/').post(protect, addOrderItems).get(protect, admin, getOrders);

router.route('/myorders').get(protect, getMyOrders);
//update route  for pay information on existing order
router.route('/:id/pay').put(protect, updateOrderToPaid);

//make sure these are at the bottom
router
  .route('/:id')
  .get(protect, getOrderById)
  .delete(protect, admin, deleteOrder);

router.route('/:id/deliver').put(protect, admin, updateOrderToDelivered);

export default router;
