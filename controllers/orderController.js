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

// ─── CREATE ORDER ─────────────────────────────────────────────────────────────
const createOrder = async (req, res) => {
    try {
        const { menuItemId, quantity, deliveryAddress, paymentMethod } = req.body;
        const item = await MenuItem.findById(menuItemId);
        if (!item) {
            req.flash('error', 'Menu item not found.');
            return res.redirect('/menu');
        }

        const qty = parseInt(quantity, 10) || 1;
        if (qty > 20) {
            req.flash('error', 'You cannot order more than 20 items at once.');
            return res.redirect('back');
        }
        
        const totalAmount = item.price * qty;

        const newOrder = new Order({
            user: req.session.user.id,
            items: [{
                menuItem: item._id,
                name: item.name,
                price: item.price,
                quantity: qty
            }],
            totalAmount,
            deliveryAddress: deliveryAddress || 'Dine-in',
            paymentMethod: paymentMethod || 'Cash'
        });

        await newOrder.save();
        req.flash('success', 'Order placed successfully!');
        res.redirect('/orders');
    } catch (error) {
        req.flash('error', 'Could not place order.');
        res.redirect('back');
    }
};

// ─── CANCEL ORDER ─────────────────────────────────────────────────────────────
const cancelOrder = async (req, res) => {
    try {
        const order = await Order.findById(req.params.id);

        if (!order) {
            req.flash('error', 'Order not found.');
            return res.redirect('/orders');
        }

        if (order.user.toString() !== req.session.user.id.toString()) {
            req.flash('error', 'You cannot cancel this order.');
            return res.redirect('/orders');
        }

        if (order.status !== 'Pending') {
            req.flash('error', 'Only pending orders can be cancelled.');
            return res.redirect('/orders');
        }

        order.status = 'Cancelled';
        await order.save();

        req.flash('success', 'Order cancelled successfully.');
        res.redirect('/orders');

    } catch (error) {
        req.flash('error', 'Could not cancel order.');
        res.redirect('/orders');
    }
};

module.exports = { getMyOrders, createOrder, cancelOrder };
