const mongoose = require('mongoose');

const reservationSchema = new mongoose.Schema(
    {
        user: {
            type    : mongoose.Schema.Types.ObjectId,
            ref     : 'User',
            required: true,
        },
        name: {
            type    : String,
            required: [true, 'Name is required'],
            trim    : true,
        },
        phone: {
            type    : String,
            required: [true, 'Phone number is required'],
            trim    : true,
        },
        date: {
            type    : Date,
            required: [true, 'Reservation date is required'],
        },
        time: {
            type    : String,
            required: [true, 'Reservation time is required'],
        },
        guests: {
            type    : Number,
            required: [true, 'Number of guests is required'],
            min     : [1, 'At least 1 guest required'],
            max     : [20, 'For 20+ guests, please call us directly'],
        },
        specialRequest: {
            type   : String,
            trim   : true,
            default: '',
        },
        status: {
            type   : String,
            enum   : ['Pending', 'Confirmed', 'Cancelled'],
            default: 'Pending',
        },
    },
    { timestamps: true }
);

module.exports = mongoose.model('Reservation', reservationSchema);