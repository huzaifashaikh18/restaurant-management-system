const Order    = require('../model/Order');
const MenuItem = require('../model/MenuItem');

// ─── GET USER ORDERS ─────────────────────────────────────────────────────────
const getMyOrders = async (req, res) => {
    try {
        const orders = await Order.find({ user: req.session.user.id })
            .sort({ createdAt: -1 });
        res.render('orders/myOrders', { title: 'My Orders', orders });
    } catch (error) {
        req.flash('error', 'Could not load orders.');
        res.redirect('/dashboard');
    }
};

module.exports = { getMyOrders };
