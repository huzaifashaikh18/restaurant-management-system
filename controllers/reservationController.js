const Reservation = require('../model/Reservation');

// GET /reservations — booking form
const getReservationForm = (req, res) => {
    res.render('reservation/BookTable', { title: 'Reserve a Table' });
};

// POST /reservations — create reservation
const createReservation = async (req, res) => {
    try {
        const { name, phone, date, time, guests, specialRequest } = req.body;

        const reservationDate = new Date(date);
        const today = new Date();
        today.setHours(0, 0, 0, 0);

        if (reservationDate < today) {
            req.flash('error', 'Please choose today or a future date.');
            return res.redirect('/reservations');
        }

    await Reservation.create({
        user: req.session.user.id || req.session.user._id,
        name,
        phone,
        date: reservationDate,
        time,
        guests        : Number(guests),
        specialRequest: specialRequest || '',
    });

        req.flash('success', 'Table reserved! We will confirm shortly.');
        res.redirect('/reservation/myReservations');

    } catch (error) {
        req.flash('error', error.message || 'Could not create reservation.');
        res.redirect('/reservations');
    }
};

// GET /reservation/myReservations — logged-in user's own reservations
const getMyReservations = async (req, res) => {
    try {
        const reservations = await Reservation.find({ user: req.session.user._id }).sort({ date: 1 });
        res.render('reservation/myReservations', { title: 'My Reservations', reservations });

    } catch (error) {
        req.flash('error', 'Could not load your reservations.');
        res.redirect('/dashboard');
    }
};

// POST /reservations/:id/cancel — cancel own reservation
const cancelReservation = async (req, res) => {
    try {
        const reservation = await Reservation.findById(req.params.id);

        if (!reservation) {
            req.flash('error', 'Reservation not found.');
            return res.redirect('/reservation/myReservations');
        }

        if (reservation.user.toString() !== req.session.user._id.toString()) {
            req.flash('error', 'You cannot cancel this reservation.');
            return res.redirect('/reservation/myReservations');
        }

        reservation.status = 'Cancelled';
        await reservation.save();

        req.flash('success', 'Reservation cancelled.');
        res.redirect('/reservation/myReservations');

    } catch (error) {
        req.flash('error', 'Could not cancel reservation.');
        res.redirect('/reservation/myReservations');
    }
};

module.exports = { getReservationForm, createReservation, getMyReservations, cancelReservation };


