const MenuItem = require('../model/MenuItem');

// ─── GET ALL MENU ITEMS (Public) ──────────────────────────────────────────────
const getMenu = async (req, res) => {
    try {
        const { category } = req.query;

        const filter = { isAvailable: true };
        if (category && category !== 'All') {
            filter.category = category;
        }

        const menuItems = await MenuItem.find(filter).sort({ category: 1 });
        const categories = await MenuItem.distinct('category');

        res.render('menu/index', {
            title      : 'Our Menu',
            menuItems,
            categories,
            activeCategory: category || 'All',
        });

    } catch (error) {
        req.flash('error', 'Could not load menu.');
        res.redirect('/');
    }
};

// ─── GET SINGLE MENU ITEM (Public) ────────────────────────────────────────────
const getMenuItemDetails = async (req, res) => {
    try {
        const item = await MenuItem.findById(req.params.id);

        if (!item) {
            req.flash('error', 'Menu item not found.');
            return res.redirect('/menu');   // ✅ fixed
        }

        res.render('menu/details', { title: item.name, item });

    } catch (error) {
        req.flash('error', 'Could not load item.');
        res.redirect('/menu');
    }
};

// ─── ADMIN: GET ALL ITEMS ─────────────────────────────────────────────────────
const adminGetMenu = async (req, res) => {
    try {
        const menuItems = await MenuItem.find({}).sort({ category: 1 });
        res.render('admin/menu/index', { title: 'Manage Menu', menuItems });
    } catch (error) {
        req.flash('error', 'Could not load menu.');
        res.redirect('/dashboard');
    }
};

// ─── ADMIN: GET ADD FORM ──────────────────────────────────────────────────────
const adminGetAddItem = (req, res) => {
    res.render('admin/menu/form', { title: 'Add Menu Item', item: null });
};

// ─── ADMIN: POST ADD ITEM ─────────────────────────────────────────────────────
const adminPostAddItem = async (req, res) => {
    try {
        const { name, description, price, category, isAvailable } = req.body;

        await MenuItem.create({
            name,
            description,
            price      : Number(price),
            category,
            isAvailable: isAvailable === 'on',
            addedBy    : req.session.user._id,
        });

        req.flash('success', `"${name}" added to menu!`);
        res.redirect('/admin/menu');

    } catch (error) {
        req.flash('error', error.message || 'Could not add item.');
        res.redirect('/admin/menu/add');
    }
};

// ─── ADMIN: GET EDIT FORM ─────────────────────────────────────────────────────
const adminGetEditItem = async (req, res) => {
    try {
        const item = await MenuItem.findById(req.params.id);

        if (!item) {
            req.flash('error', 'Item not found.');
            return res.redirect('/admin/menu');
        }

        res.render('admin/menu/form', { title: 'Edit Menu Item', item });

    } catch (error) {
        req.flash('error', 'Could not load item.');
        res.redirect('/admin/menu');
    }
};

// ─── ADMIN: POST EDIT ITEM ────────────────────────────────────────────────────
const adminPostEditItem = async (req, res) => {
    try {
        const { name, description, price, category, isAvailable } = req.body;

        const item = await MenuItem.findById(req.params.id);

        if (!item) {
            req.flash('error', 'Item not found.');
            return res.redirect('/admin/menu');
        }

        item.name        = name;
        item.description = description;
        item.price       = Number(price);
        item.category    = category;
        item.isAvailable = isAvailable === 'on';

        await item.save();

        req.flash('success', `"${name}" updated!`);
        res.redirect('/admin/menu');

    } catch (error) {
        req.flash('error', error.message || 'Could not update item.');
        res.redirect(`/admin/menu/${req.params.id}/edit`);
    }
};

// ─── ADMIN: DELETE ITEM ───────────────────────────────────────────────────────
const adminDeleteItem = async (req, res) => {
    try {
        const item = await MenuItem.findByIdAndDelete(req.params.id);

        if (!item) {
            req.flash('error', 'Item not found.');
            return res.redirect('/admin/menu');
        }

        req.flash('success', `"${item.name}" deleted.`);
        res.redirect('/admin/menu');

    } catch (error) {
        req.flash('error', 'Could not delete item.');
        res.redirect('/admin/menu');
    }
};

module.exports = {
    getMenu,
    getMenuItemDetails,
    adminGetMenu,
    adminGetAddItem,
    adminPostAddItem,
    adminGetEditItem,
    adminPostEditItem,
    adminDeleteItem,
};