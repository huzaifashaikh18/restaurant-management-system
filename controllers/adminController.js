const MenuItem    = require('../model/MenuItem');
const User        = require('../model/user');
const Reservation = require('../model/Reservation');
const Order       = require('../model/Order');

// ─── ADMIN DASHBOARD ─────────────────────────────────────────────────────────
const getAdminDashboard = async (req, res) => {
    try {
        const totalItems        = await MenuItem.countDocuments();
        const totalUsers        = await User.countDocuments();
        const totalReservations = await Reservation.countDocuments();
        const totalOrders       = await Order.countDocuments();

        res.render('admin/dashboard', {
            title: 'Admin Dashboard',
            stats: { totalItems, totalUsers, totalReservations, totalOrders },
        });
    } catch (error) {
        req.flash('error', 'Could not load admin dashboard.');
        res.redirect('/dashboard');
    }
};

// ─── LIST ALL MENU ITEMS (Admin) ─────────────────────────────────────────────
const getAdminMenuItems = async (req, res) => {
    try {
        const menuItems = await MenuItem.find().sort({ category: 1 });
        res.render('admin/menuItems', { title: 'Manage Menu', menuItems });
    } catch (error) {
        req.flash('error', 'Could not load menu items.');
        res.redirect('/admin');
    }
};

// ─── SHOW ADD FORM ───────────────────────────────────────────────────────────
const showAddMenuItem = (req, res) => {
    res.render('admin/addMenuItem', { title: 'Add Menu Item' });
};

// ─── CREATE MENU ITEM ────────────────────────────────────────────────────────
const addMenuItem = async (req, res) => {
    try {
        const { name, description, price, category, image, isAvailable } = req.body;
        await MenuItem.create({
            name,
            description,
            price  : Number(price),
            category,
            image  : image || '/images/default-food.jpg',
            isAvailable: isAvailable === 'on' || isAvailable === 'true',
            addedBy: req.session.user.id,
        });
        req.flash('success', 'Menu item added successfully!');
        res.redirect('/admin/menu');
    } catch (error) {
        req.flash('error', error.message);
        res.redirect('/admin/menu/new');
    }
};

// ─── SHOW EDIT FORM ──────────────────────────────────────────────────────────
const showEditMenuItem = async (req, res) => {
    try {
        const item = await MenuItem.findById(req.params.id);
        if (!item) {
            req.flash('error', 'Item not found.');
            return res.redirect('/admin/menu');
        }
        res.render('admin/editMenuItem', { title: 'Edit Menu Item', item });
    } catch (error) {
        req.flash('error', 'Could not load item.');
        res.redirect('/admin/menu');
    }
};

// ─── UPDATE MENU ITEM ────────────────────────────────────────────────────────
const updateMenuItem = async (req, res) => {
    try {
        const { name, description, price, category, image, isAvailable } = req.body;
        await MenuItem.findByIdAndUpdate(req.params.id, {
            name,
            description,
            price  : Number(price),
            category,
            image  : image || '/images/default-food.jpg',
            isAvailable: isAvailable === 'on' || isAvailable === 'true',
        });
        req.flash('success', 'Menu item updated!');
        res.redirect('/admin/menu');
    } catch (error) {
        req.flash('error', error.message);
        res.redirect('/admin/menu');
    }
};

// ─── DELETE MENU ITEM ────────────────────────────────────────────────────────
const deleteMenuItem = async (req, res) => {
    try {
        await MenuItem.findByIdAndDelete(req.params.id);
        req.flash('success', 'Menu item deleted.');
        res.redirect('/admin/menu');
    } catch (error) {
        req.flash('error', 'Could not delete item.');
        res.redirect('/admin/menu');
    }
};

// ─── MANAGE ALL RESERVATIONS (Admin) ─────────────────────────────────────────
const getAdminReservations = async (req, res) => {
    try {
        const reservations = await Reservation.find()
            .populate('user', 'name email')
            .sort({ date: -1 });
        res.render('admin/reservations', { title: 'All Reservations', reservations });
    } catch (error) {
        req.flash('error', 'Could not load reservations.');
        res.redirect('/admin');
    }
};

// ─── UPDATE RESERVATION STATUS ───────────────────────────────────────────────
const updateReservationStatus = async (req, res) => {
    try {
        const { status } = req.body;
        await Reservation.findByIdAndUpdate(req.params.id, { status });
        req.flash('success', 'Reservation status updated.');
        res.redirect('/admin/reservations');
    } catch (error) {
        req.flash('error', 'Could not update status.');
        res.redirect('/admin/reservations');
    }
};

// ─── MANAGE USERS (Admin) ────────────────────────────────────────────────────
const getAdminUsers = async (req, res) => {
    try {
        const users = await User.find().sort({ createdAt: -1 });
        res.render('admin/users', { title: 'Manage Users', users });
    } catch (error) {
        req.flash('error', 'Could not load users.');
        res.redirect('/admin');
    }
};

module.exports = {
    getAdminDashboard,
    getAdminMenuItems,
    showAddMenuItem,
    addMenuItem,
    showEditMenuItem,
    updateMenuItem,
    deleteMenuItem,
    getAdminReservations,
    updateReservationStatus,
    getAdminUsers,
};
