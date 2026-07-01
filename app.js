require('dotenv').config();
const express           = require('express');
const session           = require('express-session');
const flash             = require('connect-flash');
const methodOverride    = require('method-override');
const path              = require('path');
const logger            = require('./utils/logger');
const authRoutes        = require('./routes/authroutes');
const homeRoutes        = require('./routes/homeRoutes');
const menuRoutes        = require('./routes/menuRoutes');
const reservationRoutes = require('./routes/reservationRoutes');

const app = express();

// ─── VIEW ENGINE ─────────────────────────────────────────────────────────────
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// ─── STATIC FILES ────────────────────────────────────────────────────────────
app.use(express.static(path.join(__dirname, 'public')));


// ─── BODY PARSER ─────────────────────────────────────────────────────────────
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ─── METHOD OVERRIDE ─────────────────────────────────────────────────────────
app.use(methodOverride('_method'));

// ─── SESSION ─────────────────────────────────────────────────────────────────
app.use(session({
    secret           : process.env.SESSION_SECRET || 'restaurant_secret',
    resave           : false,
    saveUninitialized: false,
    cookie           : { maxAge: 1000 * 60 * 60 * 24 } // 1 day
}));

// ─── FLASH MESSAGES ──────────────────────────────────────────────────────────
app.use(flash());

// ─── GLOBAL VARIABLES ────────────────────────────────────────────────────────
app.use((req, res, next) => {
    res.locals.success = req.flash('success');
    res.locals.error   = req.flash('error');
    res.locals.user    = req.session.user || null;
    next();
});

// ─── LOGGER (Dev only) ───────────────────────────────────────────────────────
if (process.env.NODE_ENV !== 'production') {
    app.use((req, res, next) => {
        logger.debug(`${req.method} ${req.url}`);
        next();
    });
}

// ─── ROUTES ──────────────────────────────────────────────────────────────────
app.use('/', authRoutes);
app.use('/', homeRoutes);
app.use('/', menuRoutes);
app.use('/', reservationRoutes);
// ─── 404 HANDLER ─────────────────────────────────────────────────────────────
app.use((req, res) => {
    res.status(404).render('404', { title: 'Page Not Found' });
});

// ─── GLOBAL ERROR HANDLER ────────────────────────────────────────────────────
app.use((err, req, res, next) => {
    logger.error(err.message);
    req.flash('error', err.message || 'Something went wrong');
    res.redirect('back');
});

module.exports = app;