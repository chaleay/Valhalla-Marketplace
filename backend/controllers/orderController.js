import asyncHandler from 'express-async-handler';
import Order from '../models/orderModel.js';
import Product from '../models/productModel.js';

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
  //retrieve order from DB and then populate user with name and email
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

//@desc update order to paid
//@route PUT /api/orders/:id/pay
//@access Private
const updateOrderToPaid = asyncHandler(async (req, res) => {
  //populate user with name and email
  const order = await Order.findById(req.params.id);

  //take off inStock amounts from products in DB
  order.orderItems.map(async (orderItem) => {
    //find the product with the matching id in the order
    const product = await Product.findById(orderItem.product);
    product.countInStock -= orderItem.qty;
    await product.save();
  });

  //update the current order
  if (order) {
    order.isPaid = true;
    order.paidAt = Date.now();
    //this shit is added by paypal API
    //defined in front by API, hence why their parent is req
    order.paymentResult = {
      id: req.body.id,
      status: req.body.status,
      update_time: req.body.update_time,
      email_addess: req.body.payer.email_address,
    };

    //update existing order in DB
    const updatedOrder = await order.save();
    res.json(updatedOrder);
  } else {
    res.status(404);
    throw new Error('An error occured while processing payment information.');
  }
});

//@desc update order to paid
//@route PUT /api/orders/:id/pay
//@access Private
const updateOrderToDelivered = asyncHandler(async (req, res) => {
  //populate user with name and email
  const order = await Order.findById(req.params.id);

  //update the current order
  if (order) {
    order.isDelivered = true;
    order.deliveredAt = Date.now();

    //update existing order in DB
    const updatedOrder = await order.save();
    res.json(updatedOrder);
  } else {
    res.status(404);
    throw new Error('An error occured while processing payment information.');
  }
});

// @desc Get logged in user orders
// @route GET /api/orders/myorders
// @access Private
const getMyOrders = asyncHandler(async (req, res) => {
  //populate user with name and email
  if (req.user) {
    const orders = await Order.find({ user: req.user._id });
    res.json(orders);
  } else {
    res.status(401);
    throw new Error(
      'Apparently, you are not authorized to view your own orders.'
    );
  }
});

const getOrders = asyncHandler(async (req, res) => {
  //populate user with name and email
  const orders = await Order.find({}).populate('user', 'id name');
  res.json(orders);
});

// @desc delete user
// @route delete /api/users/
// @private private/admin route - user deletion follows seperate route and seperate security
const deleteOrder = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id);

  if (order) {
    await order.remove();
    res.json({ message: 'Order removed' });
  } else {
    res.status(404);
    throw new Error('Order not found');
  }
});

export {
  addOrderItems,
  getOrderById,
  updateOrderToPaid,
  getMyOrders,
  getOrders,
  deleteOrder,
  updateOrderToDelivered,
};
