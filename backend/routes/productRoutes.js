import express from 'express';
//using a middleware framework for handling async try...catch blocks
import asyncHandler from 'express-async-handler';
const router = express.Router();
import Product from '../models/productModel.js';

// @desc Fetch all products
// api/products
router.get(
  '/',
  asyncHandler(async (req, res) => {
    const products = await Product.find();
    res.json(products);
  })
);

// @desc Fetch a product with given id
// /api/products/:id
router.get(
  '/:id',
  asyncHandler(async (req, res) => {
    const product = await Product.findById(req.params.id);

    //if product is not null, send data from backend to frontend in json format
    if (product) {
      res.json(product);
    } else {
      //if we pass in an object id that is not valid
      res.status(404);
      throw new Error('Product not found');
    }
  })
);

export default router;
