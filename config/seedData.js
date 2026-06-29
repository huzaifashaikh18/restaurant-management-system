const mongoose   = require('mongoose');
const MenuItem   = require('../model/MenuItem');
require('dotenv').config();

const menuItems = [
    // ─── Gujarati ───────────────────────────────
    {
        name       : 'Sev Tameta',
        description: 'Spicy tangy tomato curry topped with crispy sev — no onion, no garlic',
        price      : 120,
        category   : 'Gujarati',
        isAvailable: true,
    },
    {
        name       : 'Ringan Bhartu',
        description: 'Roasted eggplant mixed with onion, tomato, ginger-garlic paste and spices',
        price      : 150,
        category   : 'Gujarati',
        isAvailable: true,
    },
    {
        name       : 'Baby Potatoes',
        description: 'Spicy garlicky baby potatoes — Gujarati style',
        price      : 130,
        category   : 'Gujarati',
        isAvailable: true,
    },
    {
        name       : 'Toor Dal',
        description: 'Soft cooked toor dal tempered with ghee, spices, onions and tomatoes',
        price      : 110,
        category   : 'Gujarati',
        isAvailable: true,
    },

    // ─── Starters ───────────────────────────────
    {
        name       : 'Hara Bhara Kabab',
        description: 'Crispy spinach and pea patties served with mint chutney',
        price      : 180,
        category   : 'Starters',
        isAvailable: true,
    },
    {
        name       : 'Paneer Tikka',
        description: 'Marinated cottage cheese grilled in tandoor with spices',
        price      : 250,
        category   : 'Starters',
        isAvailable: true,
    },

    // ─── Main Course ────────────────────────────
    {
        name       : 'Paneer Butter Masala',
        description: 'Soft paneer cubes in rich creamy tomato gravy',
        price      : 280,
        category   : 'Main Course',
        isAvailable: true,
    },
    {
        name       : 'Dal Makhani',
        description: 'Slow cooked black lentils in buttery tomato gravy',
        price      : 220,
        category   : 'Main Course',
        isAvailable: true,
    },
    {
        name       : 'Shahi Korma',
        description: 'Rich and creamy vegetable korma with nuts and spices',
        price      : 260,
        category   : 'Main Course',
        isAvailable: true,
    },

    // ─── Breads ─────────────────────────────────
    {
        name       : 'Tandoori Roti',
        description: 'Freshly baked whole wheat bread from tandoor',
        price      : 30,
        category   : 'Breads',
        isAvailable: true,
    },
    {
        name       : 'Butter Naan',
        description: 'Soft leavened bread brushed with butter',
        price      : 50,
        category   : 'Breads',
        isAvailable: true,
    },

    // ─── Rice ───────────────────────────────────
    {
        name       : 'Vegetable Biryani',
        description: 'Fragrant basmati rice cooked with vegetables and whole spices',
        price      : 220,
        category   : 'Rice',
        isAvailable: true,
    },
    {
        name       : 'Khichdi',
        description: 'Comfort food — rice and lentils cooked together with ghee',
        price      : 120,
        category   : 'Rice',
        isAvailable: true,
    },

    // ─── Desserts ───────────────────────────────
    {
        name       : 'Gulab Jamun',
        description: 'Soft milk solid balls soaked in rose flavored sugar syrup',
        price      : 80,
        category   : 'Desserts',
        isAvailable: true,
    },
    {
        name       : 'Rasmalai',
        description: 'Soft cottage cheese dumplings in sweetened saffron milk',
        price      : 100,
        category   : 'Desserts',
        isAvailable: true,
    },

    // ─── Drinks ─────────────────────────────────
    {
        name       : 'Masala Chaas',
        description: 'Spiced buttermilk — refreshing and cooling',
        price      : 60,
        category   : 'Drinks',
        isAvailable: true,
    },
    {
        name       : 'Mango Lassi',
        description: 'Thick creamy yogurt drink blended with fresh mango',
        price      : 90,
        category   : 'Drinks',
        isAvailable: true,
    },
];

const seedDB = async () => {
    try {
        await mongoose.connect(process.env.DATABASE_URI);
        await MenuItem.deleteMany({});
        await MenuItem.insertMany(menuItems);
        console.log(' Menu items seeded successfully!');
        process.exit();
    } catch (err) {
        console.error(' Seed error:', err.message);
        process.exit(1);
    }
};

seedDB();