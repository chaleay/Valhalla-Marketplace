import asyncHandler from 'express-async-handler';
import Product from '../models/productModel.js';

const getProducts = asyncHandler(async (req, res) => {
  const products = await Product.find();

  res.json(products);
});

const getProductById = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);

  //if product is not null, send data from backend to frontend in json format
  if (product) {
    res.json(product);
  } else {
    //if we pass in an object id that is not valid
    res.status(404);
    throw new Error('Product not found');
  }
});

export { getProducts, getProductById };
