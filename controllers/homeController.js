// MenuItem abhi tak bana ho ya na bana ho, dono case mein crash nahi hoga
let MenuItem;
try {
    MenuItem = require('../model/MenuItem');
} catch (e) {
    MenuItem = null;
}

const home = async (req, res) => {
    try {
        const menuItems = MenuItem
            ? await MenuItem.find({ 
                isAvailable: true,
                category: { $in: ['Punjabi', 'Chefs Special', 'Pizza', 'Desserts'] }
              }).limit(8)
            : [];
        res.render('home', { title: 'Home', menuItems });
    } catch (error) {
        console.error('Home controller error:', error);
        res.render('home', { title: 'Home', menuItems: [] });
    }
};

module.exports = { home };