import express from 'express';
//using a middleware framework for handling async try...catch blocks
import asyncHandler from 'express-async-handler';
const router = express.Router();
import Product from '../models/productModel.js';
import {
  getProductById,
  getProducts,
  deleteProduct,
  updateProductAdmin,
  createProductAdmin,
} from '../controllers/productController.js';
import { admin, protect } from '../middleware/authMiddleware.js';

// @desc GET/POST
// /api/products/
router.route('/').get(getProducts).post(protect, admin, createProductAdmin);

// @desc Fetch a product with given id
// /api/products/:id
router
  .route('/:id')
  .get(getProductById)
  .delete(protect, admin, deleteProduct)
  .put(protect, admin, updateProductAdmin);

export default router;
