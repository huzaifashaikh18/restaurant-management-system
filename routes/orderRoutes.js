const express = require('express');
const router  = express.Router();

const { isLoggedIn } = require('../Middleware/authMiddleware');
const { getMyOrders, createOrder, cancelOrder } = require('../controllers/orderController');

router.get('/orders', isLoggedIn, getMyOrders);
router.post('/orders', isLoggedIn, createOrder);
router.post('/orders/:id/cancel', isLoggedIn, cancelOrder);

module.exports = router;
