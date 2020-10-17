import express from 'express';
//using a middleware framework for handling async try...catch blocks
import asyncHandler from 'express-async-handler';
const router = express.Router();
import Product from '../models/productModel.js';
import {
  getProductById,
  getProducts,
} from '../controllers/productController.js';

// @desc Fetch all products
// /api/products/
router.route('/').get(getProducts);

// @desc Fetch a product with given id
// /api/products/:id
router.route('/:id').get(getProductById);

export default router;
