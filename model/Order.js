const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema(
    {
        user: {
            type    : mongoose.Schema.Types.ObjectId,
            ref     : 'User',
            required: true,
        },
        items: [
            {
                menuItem: {
                    type: mongoose.Schema.Types.ObjectId,
                    ref : 'MenuItem',
                },
                name    : String,
                price   : Number,
                quantity: { type: Number, default: 1, min: 1 },
            },
        ],
        totalAmount: {
            type    : Number,
            required: true,
        },
        status: {
            type   : String,
            enum   : ['Pending', 'Preparing', 'Ready', 'Delivered', 'Cancelled'],
            default: 'Pending',
        },
        deliveryAddress: {
            type   : String,
            trim   : true,
            default: 'Dine-in',
        },
        paymentMethod: {
            type   : String,
            enum   : ['Cash', 'Card', 'UPI'],
            default: 'Cash',
        },
    },
    { timestamps: true }
);

module.exports = mongoose.model('Order', orderSchema);
