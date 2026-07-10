const mongoose = require('mongoose');

const menuItemSchema = new mongoose.Schema(
    {
        name: {
            type    : String,
            required: [true, 'Item name is required'],
            trim    : true,
        },
        description: {
            type: String,
            trim: true,
        },
        price: {
            type    : Number,
            required: [true, 'Price is required'],
        },
        category: {
            type: String,
            enum: [
                'Chefs Special', 'Starters', 'Soups', 'Salads',
                'Gujarati', 'Punjabi', 'Chinese', 'Italian',
                'Pizza', 'Burgers', 'Rice & Biryani', 'Breads',
                'Desserts', 'Mocktails', 'Coffee', 'Fresh Juice', 'Ice Cream'
                ],
                default: 'Starters',
        },
        image: {
            type   : String,
            default: '/images/default-food.jpg',
        },
        isAvailable: {
            type   : Boolean,
            default: true,
        },
        addedBy: {
            type: mongoose.Schema.Types.ObjectId,
            ref : 'User',
        },
    },
    { timestamps: true }
);

module.exports = mongoose.model('MenuItem', menuItemSchema);