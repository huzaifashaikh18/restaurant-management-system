const express = require('express');
const router  = express.Router();

const {
    showRegister,
    register,
    showLogin,
    login,
    logout,
    dashboard,
} = require('../controllers/authController');

const { isLoggedIn, isAdmin } = require('../Middleware/authMiddleware');

// ─── AUTH ROUTES ──────────────────────────────────────────────────────────────
router.get('/register', showRegister);
router.post('/register', register);

router.get('/login', showLogin);
router.post('/login', login);

router.get('/logout', logout);

// ─── PROTECTED ROUTES ─────────────────────────────────────────────────────────
router.get('/dashboard', isLoggedIn, dashboard);

module.exports = router;