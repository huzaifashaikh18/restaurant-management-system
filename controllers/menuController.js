const MenuItem = require('../model/MenuItem');

// ─── GET ALL MENU ITEMS ────────────────────────────────────────────────────────
const getMenu = async (req, res) => {
    try {
        const { category } = req.query;

        const filter = { isAvailable: true };
        if (category && category !== 'All') {
            filter.category = category;
        }

        const menuItems = await MenuItem.find(filter).sort({ category: 1 });

        // Get unique categories for filter buttons
        const categories = await MenuItem.distinct('category');

        res.render('menu/index', {
            title: 'Our Menu',
            menuItems,
            categories,
            activeCategory: category || 'All',
        });

    } catch (error) {
        req.flash('error', 'Could not load menu.');
        res.redirect('/dashboard');
    }
};

// ─── GET SINGLE MENU ITEM ──────────────────────────────────────────────────────
const getMenuItemDetails = async (req, res) => {
    try {
        const item = await MenuItem.findById(req.params.id);

        if (!item) {
            req.flash('error', 'Menu item not found.');
            return res.redirect('/menu');
        }

        res.render('menu/details', { title: item.name, item });

    } catch (error) {
        req.flash('error', 'Could not load item.');
        res.redirect('/menu');
    }
};

module.exports = { getMenu, getMenuItemDetails };