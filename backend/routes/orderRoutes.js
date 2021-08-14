const express = require('express');
const router = express.Router();
const {protect, admin} = require('../middleWare/authMiddleware');
const { addOrderItems, getOrderById, updateOrderToPaid, getMyOrders, getAllorders, updateOrderToDelivered } = require('../controllers/orderControllers')

router.route('/').post(protect, addOrderItems);

router.route('/myorders').get(protect, getMyOrders);

router.route('/allorders').get(protect, admin, getAllorders);

router.route('/:id').get(protect, getOrderById);

router.route('/:id/pay').put(protect, updateOrderToPaid);

router.route('/:id/deliver').put(protect, admin, updateOrderToDelivered);

module.exports = router