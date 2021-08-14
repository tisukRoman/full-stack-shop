const asyncHandler = require('express-async-handler');
const Order = require('../models/orderModel');

// @desc    CREATE A NEW ORDER
// @route   POST /api/orders
// @access  Private
const addOrderItems = asyncHandler(async (req, res) => {
    const {
        orderItems,
        shippingAddress,
        paymentMethod,
        itemsPrice,
        taxPrice,
        shippingPrice,
        totalPrice } = req.body;

    if (orderItems && !orderItems.length) {
        res.status(404);
        throw new Error('No order items');
    }

    const order = new Order({
        orderItems,
        user: req.user._id,
        shippingAddress,
        paymentMethod,
        itemsPrice,
        taxPrice,
        shippingPrice,
        totalPrice
    })

    const createdOrder = await order.save();
    res.status(201).json(createdOrder);
})


// @desc    FETCH A SINGLE ORDER
// @route   GET /api/orders/:id
// @access  Private
const getOrderById = asyncHandler(async (req, res) => {
    const order = await Order.findById(req.params.id).populate('user', 'name email');

    if (!order) {
        res.status(404);
        throw new Error('order not found');
    }

    res.json(order)
})


// @desc    UPDATE ORDER TO PAID
// @route   PUT /api/orders/:id/pay
// @access  Private
const updateOrderToPaid = asyncHandler(async (req, res) => {

    const order = await Order.findById(req.params.id);

    if (!order) {
        res.status(404);
        throw new Error('order not found');
    }

    order.isPaid = true;
    order.paidAt = Date.now();
    order.paymentResult = {
        id: req.body.id,
        status: req.body.status,
        update_time: req.body.update_time,
        email_address: req.body.payer.email_address
    }

    const updatedOrder = await order.save();
    res.json(updatedOrder)

})


// @desc    UPDATE ORDER TO DELIVERED
// @route   PUT /api/orders/:id/deliver
// @access  Private/Admin
const updateOrderToDelivered = asyncHandler(async (req, res) => {

    const order = await Order.findById(req.params.id);

    if (!order) {
        res.status(404);
        throw new Error('order not found');
    }

    order.isDelivered = true;
    order.deliveredAt = Date.now();

    const updatedOrder = await order.save();
    res.json(updatedOrder)

})


// @desc    GET MY ORDERS
// @route   GET /api/orders/myorders
// @access  Private
const getMyOrders = asyncHandler(async (req, res) => {
    const orders = await Order.find({ user: req.user._id });
    res.json(orders);
})


// @desc    GET ALL ORDERS
// @route   GET /api/orders/allorders
// @access  Private/Admin
const getAllorders = asyncHandler(async (req, res) => {
    const orders = await Order.find({}).populate('user', 'id name')
    res.json(orders);
})


module.exports = {
    addOrderItems,
    getOrderById,
    updateOrderToPaid,
    getMyOrders,
    getAllorders,
    updateOrderToDelivered
}