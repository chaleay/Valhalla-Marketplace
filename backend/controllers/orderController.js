import asyncHandler from 'express-async-handler';
import Order from '../models/orderModel.js';

// @desc Create new order
// @route POST /api/orders
// @access private
const addOrderItems = asyncHandler(async (req, res) => {
  const {
    orderItems,
    shippingAddress,
    paymentMethod,
    itemsPrice,
    taxPrice,
    shippingPrice,
    totalPrice,
  } = req.body;

  //access country name directly
  shippingAddress.country = shippingAddress.country.name;

  if (orderItems && orderItems.length === 0) {
    res.status(400);
    throw new Error('No order Items');
    return;
  } else {
    //create new mongoDB object
    const order = new Order({
      orderItems,
      user: req.user._id,
      shippingAddress,
      paymentMethod,
      itemsPrice,
      taxPrice,
      shippingPrice,
      totalPrice,
    });

    console.log('in order route orderController');
    const createdOrder = await order.save();
    res.status(201).json(createdOrder);
  }
});

//@desc Get Order by ID
//@route GET /api/orders/:id
//@access Private

const getOrderById = asyncHandler(async (req, res) => {
  //populate user with name and email
  const order = await Order.findById(req.params.id).populate(
    'user',
    'name email'
  );

  if (order) {
    res.json(order);
  } else {
    res.status(404);
    throw new Error('Could not find a valid order with the given ID.');
  }
});

export { addOrderItems, getOrderById };
