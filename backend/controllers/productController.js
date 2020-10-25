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

// @desc Delete a product
// @route DELETE /api/products/:id
// @access Private/Admin

const deleteProduct = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);

  if (product) {
    await product.remove();
    res.json('product removed');
  } else {
    res.status(404);
    throw new Error('Could not find the product');
  }
});

// @desc Create a product
// @route POST /api/products/
// @access Private/Admin

const createProductAdmin = asyncHandler(async (req, res) => {
  const product = new Product({
    name: 'Sample Name',
    price: 0,
    user: req.user._id,
    image: '/images/sample.png',
    brand: 'Sample Brand',
    category: 'Sample Category',
    countInStock: 0,
    numReviews: 0,
    description: 'Sample Description',
  });

  const createdProduct = await product.save();
  res.status(201).json(createdProduct);
});

// @desc Update a product
// @route PUT /api/products/
// @access Private/Admin

const updateProductAdmin = asyncHandler(async (req, res) => {
  //destructure req.body
  const {
    name,
    price,
    description,
    brand,
    image,
    category,
    countInStock,
    numReviews,
  } = req.body;

  const product = await Product.findById(req.params.id);
  if (product) {
    //set properties of product to those defined above
    product.name = name;
    product.price = price;
    product.description = description;
    product.brand = brand;
    product.image = image;
    product.category = category;
    product.countInStock = countInStock;
    product.numReviews = numReviews;

    const updatedProduct = await product.save();
    res.json(updatedProduct);
  } else {
    res.status(404);
    throw new Error('Product not found');
  }
});

export {
  getProducts,
  getProductById,
  deleteProduct,
  updateProductAdmin,
  createProductAdmin,
};
