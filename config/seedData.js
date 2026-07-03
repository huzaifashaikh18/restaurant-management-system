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
        image      : 'https://images.unsplash.com/photo-1585937421612-70a008356fbe?w=400&auto=format&fit=crop',
        isAvailable: true,
    },
    {
        name       : 'Ringan Bhartu',
        description: 'Roasted eggplant mixed with onion, tomato, ginger-garlic paste and spices',
        price      : 150,
        category   : 'Gujarati',
        image      : 'https://images.unsplash.com/photo-1631452180539-96aca7d48617?w=400&auto=format&fit=crop',
        isAvailable: true,
    },
    {
        name       : 'Baby Potatoes',
        description: 'Spicy garlicky baby potatoes — Gujarati style',
        price      : 130,
        category   : 'Gujarati',
        image      : 'https://images.unsplash.com/photo-1518977676601-b53f82aba655?w=400&auto=format&fit=crop',
        isAvailable: true,
    },
    {
        name       : 'Toor Dal',
        description: 'Soft cooked toor dal tempered with ghee, spices, onions and tomatoes',
        price      : 110,
        category   : 'Gujarati',
        image      : 'https://images.unsplash.com/photo-1546833999-b9f581a1996d?w=400&auto=format&fit=crop',
        isAvailable: true,
    },

    // ─── Starters ───────────────────────────────
    {
        name       : 'Hara Bhara Kabab',
        description: 'Crispy spinach and pea patties served with mint chutney',
        price      : 280,
        category   : 'Starters',
        image      : 'https://images.unsplash.com/photo-1606491956689-2ea866880c84?w=400&auto=format&fit=crop',
        isAvailable: true,
    },
    {
        name       : 'Paneer Tikka',
        description: 'Marinated cottage cheese grilled in tandoor with aromatic spices',
        price      : 380,
        category   : 'Starters',
        image      : 'https://images.unsplash.com/photo-1567188040759-fb8a883dc6d6?w=400&auto=format&fit=crop',
        isAvailable: true,
    },

    // ─── Main Course ────────────────────────────
    {
        name       : 'Paneer Butter Masala',
        description: 'Soft paneer cubes in rich creamy tomato gravy — restaurant style',
        price      : 420,
        category   : 'Main Course',
        image      : 'https://images.unsplash.com/photo-1631452180519-c014fe946bc7?w=400&auto=format&fit=crop',
        isAvailable: true,
    },
    {
        name       : 'Dal Makhani',
        description: 'Slow cooked black lentils in rich buttery tomato gravy — 24 hour slow cook',
        price      : 350,
        category   : 'Main Course',
        image      : 'https://images.unsplash.com/photo-1546833999-b9f581a1996d?w=400&auto=format&fit=crop',
        isAvailable: true,
    },
    {
        name       : 'Shahi Korma',
        description: 'Royal vegetable korma in creamy cashew and saffron gravy',
        price      : 480,
        category   : 'Main Course',
        image      : 'https://images.unsplash.com/photo-1585937421612-70a008356fbe?w=400&auto=format&fit=crop',
        isAvailable: true,
    },

    // ─── Breads ─────────────────────────────────
    {
        name       : 'Tandoori Roti',
        description: 'Freshly baked whole wheat bread straight from tandoor',
        price      : 40,
        category   : 'Breads',
        image      : 'https://images.unsplash.com/photo-1565557623262-b51c2513a641?w=400&auto=format&fit=crop',
        isAvailable: true,
    },
    {
        name       : 'Butter Naan',
        description: 'Soft leavened bread generously brushed with butter',
        price      : 60,
        category   : 'Breads',
        image      : 'https://images.unsplash.com/photo-1585937421612-70a008356fbe?w=400&auto=format&fit=crop',
        isAvailable: true,
    },

    // ─── Rice ───────────────────────────────────
    {
        name       : 'Vegetable Biryani',
        description: 'Fragrant basmati rice layered with vegetables and whole spices — dum style',
        price      : 380,
        category   : 'Rice',
        image      : 'https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?w=400&auto=format&fit=crop',
        isAvailable: true,
    },
    {
        name       : 'Khichdi',
        description: 'Comfort food — rice and lentils slow cooked with pure ghee',
        price      : 150,
        category   : 'Rice',
        image      : 'https://images.unsplash.com/photo-1546833999-b9f581a1996d?w=400&auto=format&fit=crop',
        isAvailable: true,
    },

    // ─── Desserts ───────────────────────────────
    {
        name       : 'Gulab Jamun',
        description: 'Soft milk solid balls soaked in rose flavored sugar syrup — served warm',
        price      : 120,
        category   : 'Desserts',
        image      : 'https://images.unsplash.com/photo-1558961363-fa8fdf82db35?w=400&auto=format&fit=crop',
        isAvailable: true,
    },
    {
        name       : 'Rasmalai',
        description: 'Soft cottage cheese dumplings in sweetened saffron milk — chilled',
        price      : 150,
        category   : 'Desserts',
        image      : 'https://images.unsplash.com/photo-1601050690597-df0568f70950?w=400&auto=format&fit=crop',
        isAvailable: true,
    },

    // ─── Drinks ─────────────────────────────────
    {
        name       : 'Masala Chaas',
        description: 'Spiced buttermilk with roasted cumin — refreshing and cooling',
        price      : 80,
        category   : 'Drinks',
        image      : 'https://images.unsplash.com/photo-1544145945-f90425340c7e?w=400&auto=format&fit=crop',
        isAvailable: true,
    },
    {
        name       : 'Mango Lassi',
        description: 'Thick creamy yogurt drink blended with fresh Alphonso mangoes',
        price      : 120,
        category   : 'Drinks',
        image      : 'https://images.unsplash.com/photo-1553361371-9b22f78e8b1d?w=400&auto=format&fit=crop',
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