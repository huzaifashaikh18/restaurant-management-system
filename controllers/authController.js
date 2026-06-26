const User   = require('../model/user');
const bcrypt = require('bcryptjs');

// ─── SHOW REGISTER PAGE ───────────────────────────────────────────────────────
const showRegister = (req, res) => {
    res.render('auth/register', { title: 'Register' });
};

// ─── REGISTER ────────────────────────────────────────────────────────────────
const register = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        // Check if user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            req.flash('error', 'Email already registered. Please login.');
            return res.redirect('/register');
        }

        // Create user — password hashing in pre-save hook
        await User.create({ name, email, password });

        req.flash('success', 'Account created! Please login.');
        res.redirect('/login');

    } catch (error) {
        req.flash('error', error.message);
        res.redirect('/register');
    }
};

// ─── SHOW LOGIN PAGE ──────────────────────────────────────────────────────────
const showLogin = (req, res) => {
    res.render('auth/login', { title: 'Login' });
};

// ─── LOGIN ────────────────────────────────────────────────────────────────────
const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Find user with password
        const user = await User.findOne({ email }).select('+password');
        if (!user) {
            req.flash('error', 'Invalid email or password.');
            return res.redirect('/login');
        }

        // Check password
        const isMatch = await user.comparePassword(password);
        if (!isMatch) {
            req.flash('error', 'Invalid email or password.');
            return res.redirect('/login');
        }

        // Save user in session
        req.session.user = {
            id   : user._id,
            name : user.name,
            email: user.email,
            role : user.role,
        };

        req.flash('success', `Welcome back, ${user.name}!`);
        res.redirect('/dashboard');

    } catch (error) {
        req.flash('error', error.message);
        res.redirect('/login');
    }
};

// ─── LOGOUT ───────────────────────────────────────────────────────────────────
const logout = (req, res) => {
    req.session.destroy(() => {
        res.redirect('/login');
    });
};

// ─── DASHBOARD ───────────────────────────────────────────────────────────────
const dashboard = (req, res) => {
    res.render('dashboard', { title: 'Dashboard', user: req.session.user });
};

module.exports = { showRegister,register,showLogin,login,logout, dashboard, };