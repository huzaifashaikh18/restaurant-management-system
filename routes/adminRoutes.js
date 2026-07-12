const express = require('express');
const router  = express.Router();

const { isLoggedIn, isAdmin } = require('../Middleware/authMiddleware');
const {
    getAdminDashboard,
    getAdminMenuItems,
    showAddMenuItem,
    addMenuItem,
    showEditMenuItem,
    updateMenuItem,
    deleteMenuItem,
    getAdminReservations,
    updateReservationStatus,
    getAdminUsers,
} = require('../controllers/adminController');

// All admin routes require login + admin role
router.use(isLoggedIn, isAdmin);

// Dashboard
router.get('/', getAdminDashboard);

// Menu CRUD
router.get('/menu',          getAdminMenuItems);
router.get('/menu/new',      showAddMenuItem);
router.post('/menu',         addMenuItem);
router.get('/menu/:id/edit', showEditMenuItem);
router.put('/menu/:id',      updateMenuItem);
router.delete('/menu/:id',   deleteMenuItem);

// Reservations
router.get('/reservations',          getAdminReservations);
router.put('/reservations/:id',      updateReservationStatus);

// Users
router.get('/users', getAdminUsers);

module.exports = router;
