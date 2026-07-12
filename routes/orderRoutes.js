const express = require('express');
const router  = express.Router();

const { isLoggedIn } = require('../Middleware/authMiddleware');
const { getMyOrders } = require('../controllers/orderController');

router.get('/orders', isLoggedIn, getMyOrders);

module.exports = router;
