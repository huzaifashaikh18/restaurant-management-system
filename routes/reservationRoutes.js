const express = require('express');
const router  = express.Router();

const { isLoggedIn } = require('../Middleware/authMiddleware');
const {
    getReservationForm,
    createReservation,
    getMyReservations,
    cancelReservation,
} = require('../controllers/reservationController');

router.get('/reservations', isLoggedIn, getReservationForm);
router.post('/reservations', isLoggedIn, createReservation);
router.get('/reservations/myReservations', isLoggedIn, getMyReservations);
router.post('/reservations/:id/cancel', isLoggedIn, cancelReservation);

module.exports = router;