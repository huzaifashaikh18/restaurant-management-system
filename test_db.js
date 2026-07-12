const mongoose = require('mongoose');
const MenuItem = require('./model/MenuItem');
require('dotenv').config();

const run = async () => {
    try {
        await mongoose.connect(process.env.DATABASE_URI);
        console.log('Connected to DB');
        const count = await MenuItem.countDocuments();
        console.log('Total MenuItem count:', count);
        const sample = await MenuItem.find({
            isAvailable: true,
            category: { $in: ['Punjabi', 'Chefs Special', 'Pizza', 'Desserts'] }
        }).limit(8);
        console.log('Query result count:', sample.length);
        console.log('Sample:', sample.map(s => ({ name: s.name, category: s.category })));
        process.exit(0);
    } catch (e) {
        console.error('Error:', e);
        process.exit(1);
    }
};
run();
