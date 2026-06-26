// ─── IS LOGGED IN ─────────────────────────────────────────────────────────────
const isLoggedIn = (req, res, next) => {
    if (req.session.user) {
        return next();
    }
    req.flash('error', 'Please login to access this page.');
    res.redirect('/login');
};

// ─── IS ADMIN ─────────────────────────────────────────────────────────────────
const isAdmin = (req, res, next) => {
    if (req.session.user && req.session.user.role === 'admin') {
        return next();
    }
    req.flash('error', 'Admin access only.');
    res.redirect('/dashboard');
};

module.exports = { isLoggedIn, isAdmin };