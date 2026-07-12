# 🍽️ Restaurant Management System

A full-stack restaurant management web application built with **Node.js**, **Express**, **EJS**, and **MongoDB**, allowing users to browse the menu, reserve tables, and manage orders — while admins can manage menu items, reservations, and users through a dedicated admin panel.

---

## Table of Contents

- [About the Project](#about-the-project)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Project Architecture](#project-architecture)
- [Folder Structure](#folder-structure)
- [Database Design](#database-design)
- [Installation & Setup](#installation--setup)
- [Environment Variables](#environment-variables)
- [Running the Project](#running-the-project)
- [API / Routes](#api--routes)
- [Authentication Flow](#authentication-flow)
- [Screenshots](#screenshots)
- [Future Improvements](#future-improvements)
- [Author](#author)

---

## About the Project

This is a **Restaurant Management System** where customers can browse a rich menu of 55+ dishes across 17 categories, reserve tables online, and track their orders. Admins have a full dashboard to manage menu items (CRUD), view/update reservations, and manage registered users.

The goal was to digitize the manual restaurant management process — replacing pen-and-paper menus and phone-based reservations with a clean, modern web application. The project follows the **MVC (Model-View-Controller)** design pattern for clean separation of concerns.

---

## Features

### User Features
- ✅ User registration and login (with password hashing using bcrypt)
- ✅ Browse/search menu items with **category filters** (17 categories)
- ✅ View detailed information for each menu item
- ✅ Reserve tables with date, time, guest count, and special requests
- ✅ View and cancel personal reservations
- ✅ View order history
- ✅ Role-based dashboard (customer vs admin)

### Admin Features
- ✅ Admin dashboard with stats overview (items, users, reservations, orders)
- ✅ **Add / Edit / Delete** menu items (full CRUD operations)
- ✅ View and manage **all reservations** (update status: Pending → Confirmed → Cancelled)
- ✅ View all registered **users** and their roles

### General
- ✅ **Session-based authentication** using `express-session` + `connect-mongo`
- ✅ Form validation (client-side + server-side with Mongoose validators)
- ✅ Flash messages for success/error feedback (`connect-flash`)
- ✅ **Responsive UI** — works on mobile, tablet, and desktop
- ✅ Password hashing with **bcrypt** (12 salt rounds)
- ✅ Account lockout after 5 failed login attempts
- ✅ Method override for PUT/DELETE from HTML forms
- ✅ Sticky navbar with dynamic navigation based on auth state
- ✅ 404 error page handling

---

## Tech Stack

| Layer              | Technology                                          |
|--------------------|-----------------------------------------------------|
| Frontend/Templating| EJS, HTML5, CSS3, Font Awesome                     |
| Backend            | Node.js, Express.js                                |
| Database           | MongoDB with Mongoose ODM                          |
| Authentication     | bcryptjs (password hashing), express-session       |
| Other Tools        | dotenv, connect-flash, method-override, connect-mongo, winston (logging), multer, validator |

---

## Project Architecture

This project follows the **MVC (Model-View-Controller)** pattern:

- **Model** → Defines database schemas using Mongoose (User, MenuItem, Reservation, Order)
- **View** → EJS templates that render the UI based on data passed from controllers
- **Controller** → Contains the business logic; receives requests from routes, interacts with models, and renders views

### Request Flow:

```
Browser → Routes → Controller → Model → MongoDB
                       ↓
               EJS View → Response sent to Browser
```

---

## Folder Structure

```
Restaurant_Project/
│
├── config/
│   ├── database.js          # MongoDB connection setup
│   └── seedData.js          # Seed script for 55+ menu items
│
├── controllers/
│   ├── authController.js    # Signup, login, logout, dashboard logic
│   ├── homeController.js    # Home page with featured dishes
│   ├── menuController.js    # Menu listing and item details
│   ├── reservationController.js  # Table booking logic
│   ├── orderController.js   # User order history
│   └── adminController.js   # Admin CRUD operations
│
├── model/
│   ├── user.js              # User schema (name, email, password, role)
│   ├── MenuItem.js          # Menu item schema (name, price, category)
│   ├── Reservation.js       # Reservation schema (date, time, guests)
│   └── Order.js             # Order schema (items, total, status)
│
├── routes/
│   ├── authroutes.js        # Auth routes (register, login, logout)
│   ├── homeRoutes.js        # Home page route
│   ├── menuRoutes.js        # Menu listing routes
│   ├── reservationRoutes.js # Reservation routes
│   ├── orderRoutes.js       # Order routes
│   └── adminRoutes.js       # Admin panel routes (CRUD)
│
├── views/
│   ├── partials/
│   │   ├── header.ejs       # HTML head + meta tags
│   │   ├── footer.ejs       # Footer + closing tags
│   │   └── navbar.ejs       # Dynamic navigation bar
│   ├── auth/
│   │   ├── login.ejs        # Login page
│   │   └── register.ejs     # Registration page
│   ├── menu/
│   │   ├── index.ejs        # Menu listing with category filters
│   │   └── details.ejs      # Single menu item details
│   ├── reservation/
│   │   ├── BookTable.ejs    # Table booking form
│   │   └── myReservations.ejs # User's reservation list
│   ├── orders/
│   │   └── myOrders.ejs     # User's order history
│   ├── admin/
│   │   ├── dashboard.ejs    # Admin stats overview
│   │   ├── menuItems.ejs    # Menu item management table
│   │   ├── addMenuItem.ejs  # Add new menu item form
│   │   ├── editMenuItem.ejs # Edit menu item form
│   │   ├── reservations.ejs # All reservations management
│   │   └── users.ejs        # User management table
│   ├── home.ejs             # Landing page
│   ├── dashboard.ejs        # User/Admin dashboard
│   └── 404.ejs              # Error page
│
├── Middleware/
│   └── authMiddleware.js    # isLoggedIn, isAdmin middleware
│
├── utils/
│   ├── appError.js          # Custom error class
│   └── logger.js            # Winston logger setup
│
├── public/
│   └── css/
│       └── style.css        # Complete stylesheet (700+ lines)
│
├── .env                     # Environment variables (NOT pushed to GitHub)
├── .gitignore               # Ignores node_modules, .env, logs
├── app.js                   # Express app configuration
├── server.js                # Entry point — starts server + DB connection
├── package.json             # Dependencies and scripts
└── README.md                # This file
```

> **Note:** Folder names are kept lowercase and consistent. Files are grouped by MVC pattern (model/view/controller), not by feature.

---

## Database Design

### User Model

| Field           | Type    | Description                                  |
|-----------------|---------|----------------------------------------------|
| name            | String  | Full name of user (max 50 chars)            |
| email           | String  | Unique, used for login (validated)          |
| password        | String  | Hashed using bcrypt (12 salt rounds)        |
| role            | String  | `"customer"`, `"owner"`, or `"admin"`       |
| isActive        | Boolean | Whether account is active                    |
| loginAttempts   | Number  | Tracks failed login attempts                |
| lockUntil       | Date    | Account lockout timestamp                    |
| createdAt       | Date    | Auto-generated timestamp                     |

### MenuItem Model

| Field       | Type      | Description                              |
|-------------|-----------|------------------------------------------|
| name        | String    | Name of the dish                         |
| description | String    | Dish description                         |
| price       | Number    | Price in INR (₹)                         |
| category    | String    | One of 17 categories (enum)              |
| image       | String    | URL of the dish image                    |
| isAvailable | Boolean   | Whether item is currently available      |
| addedBy     | ObjectId  | Reference to admin who added it (User)   |

### Reservation Model

| Field          | Type      | Description                           |
|----------------|-----------|---------------------------------------|
| user           | ObjectId  | Reference to User who booked          |
| name           | String    | Guest name                            |
| phone          | String    | Contact phone number                  |
| date           | Date      | Reservation date                      |
| time           | String    | Reservation time slot                 |
| guests         | Number    | Number of guests (1–20)               |
| specialRequest | String    | Optional special request              |
| status         | String    | `"Pending"`, `"Confirmed"`, `"Cancelled"` |

### Order Model

| Field           | Type      | Description                           |
|-----------------|-----------|---------------------------------------|
| user            | ObjectId  | Reference to User who ordered         |
| items           | Array     | Array of { menuItem, name, price, quantity } |
| totalAmount     | Number    | Total order amount in INR             |
| status          | String    | `"Pending"`, `"Preparing"`, `"Ready"`, `"Delivered"`, `"Cancelled"` |
| deliveryAddress | String    | Delivery address or "Dine-in"         |
| paymentMethod   | String    | `"Cash"`, `"Card"`, or `"UPI"`        |

### Relationships
- Each **Reservation** references a **User** (who made the booking)
- Each **Order** references a **User** and contains an array of **MenuItem** references
- Each **MenuItem** can optionally reference the **User** (admin) who added it

---

## Installation & Setup

### Prerequisites

Make sure you have the following installed:
- **Node.js** (v18 or above)
- **MongoDB** (local) or a MongoDB Atlas account
- **Git**

### Steps

1. **Clone the repository**
   ```bash
   git clone https://github.com/huzaifashaikh18/restaurant-management-system.git
   cd restaurant-management-system
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   Create a `.env` file in the root directory (see [Environment Variables](#environment-variables) below).

4. **Start MongoDB**
   If using local MongoDB:
   ```bash
   mongod
   ```

5. **Seed the database** (optional — loads 55+ menu items)
   ```bash
   npm run seed
   ```

6. **Run the project**
   ```bash
   npm start
   ```
   Or, for development with auto-restart:
   ```bash
   npm run dev
   ```

7. **Open in browser**
   ```
   http://localhost:5000
   ```

---

## Environment Variables

Create a `.env` file in the root folder with the following keys. **Never commit this file to GitHub** — it's already in `.gitignore`.

```env
PORT=5000
DATABASE_URI=mongodb://127.0.0.1:27017/restaurant_db
SESSION_SECRET=your_secret_key_here
NODE_ENV=development
```

| Variable        | Description                                  |
|-----------------|----------------------------------------------|
| PORT            | Port number on which the server runs         |
| DATABASE_URI    | MongoDB connection string                    |
| SESSION_SECRET  | Secret key used to sign session cookies      |
| NODE_ENV        | `development` or `production`                |

---

## Running the Project

| Command          | Purpose                                      |
|------------------|----------------------------------------------|
| `npm install`    | Installs all dependencies                    |
| `npm start`      | Runs the app in production mode              |
| `npm run dev`    | Runs the app with nodemon (auto-restart)     |
| `npm run seed`   | Seeds the database with 55+ menu items       |

### Sample `package.json` scripts:
```json
"scripts": {
    "start": "node server.js",
    "dev": "nodemon server.js",
    "seed": "node config/seedData.js"
}
```

---

## API / Routes

### Auth Routes

| Method | Route       | Description               | Access       |
|--------|-------------|---------------------------|--------------|
| GET    | /register   | Render registration page  | Public       |
| POST   | /register   | Create new user           | Public       |
| GET    | /login      | Render login page         | Public       |
| POST   | /login      | Authenticate user         | Public       |
| GET    | /logout     | Destroy session           | Logged-in    |
| GET    | /dashboard  | User/Admin dashboard      | Logged-in    |

### Menu Routes

| Method | Route       | Description               | Access       |
|--------|-------------|---------------------------|--------------|
| GET    | /menu       | List all menu items       | Public       |
| GET    | /menu/:id   | View single menu item     | Public       |

### Reservation Routes

| Method | Route                        | Description             | Access       |
|--------|------------------------------|-------------------------|--------------|
| GET    | /reservations                | Render booking form     | Logged-in    |
| POST   | /reservations                | Create reservation      | Logged-in    |
| GET    | /reservations/myReservations | View user's bookings    | Logged-in    |
| POST   | /reservations/:id/cancel     | Cancel reservation      | Logged-in    |

### Order Routes

| Method | Route    | Description               | Access       |
|--------|----------|---------------------------|--------------|
| GET    | /orders  | View user's order history | Logged-in    |

### Admin Routes (Admin Only)

| Method | Route                   | Description                | Access     |
|--------|-------------------------|----------------------------|------------|
| GET    | /admin                  | Admin dashboard with stats | Admin only |
| GET    | /admin/menu             | List all menu items        | Admin only |
| GET    | /admin/menu/new         | Render add-item form       | Admin only |
| POST   | /admin/menu             | Create new menu item       | Admin only |
| GET    | /admin/menu/:id/edit    | Render edit-item form      | Admin only |
| PUT    | /admin/menu/:id         | Update menu item           | Admin only |
| DELETE | /admin/menu/:id         | Delete menu item           | Admin only |
| GET    | /admin/reservations     | View all reservations      | Admin only |
| PUT    | /admin/reservations/:id | Update reservation status  | Admin only |
| GET    | /admin/users            | View all users             | Admin only |

---

## Authentication Flow

1. **Registration**: User submits registration form → password is hashed using **bcrypt** (12 salt rounds) → user saved in MongoDB
2. **Login**: User submits credentials → email lookup → password verified with `bcrypt.compare()` → session created using `express-session`
3. **Session Storage**: Session stores `userId`, `name`, `email`, and `role` — persisted in MongoDB via `connect-mongo`
4. **Route Protection**: Protected routes check session via middleware (`isLoggedIn`, `isAdmin`)
5. **Logout**: Session is destroyed and user is redirected to login page
6. **Account Security**: After 5 failed login attempts, account is locked for 15 minutes

### Example middleware:
```javascript
function isLoggedIn(req, res, next) {
    if (req.session.user) return next();
    req.flash('error', 'Please login to access this page.');
    res.redirect('/login');
}

function isAdmin(req, res, next) {
    if (req.session.user && req.session.user.role === 'admin') return next();
    req.flash('error', 'Admin access only.');
    res.redirect('/dashboard');
}
```

---

## Screenshots

### Home Page
The landing page features a hero section, feature highlights, popular dishes, and a CTA banner.

### Menu Page
Browse 55+ dishes across 17 categories with category filter buttons.

### Login / Register
Clean authentication forms with validation and flash messages.

### Dashboard
Role-based dashboard — customers see menu, reservations, and orders; admins get an extra admin panel card.

### Admin Panel
Admin dashboard with stats, menu CRUD table, reservation management, and user management.

### Reserve a Table
Booking form with date, time, guest count, and special requests.

---

## Future Improvements

- 💳 Add payment gateway integration (Razorpay/Stripe)
- 📧 Add email verification on signup
- 📄 Implement pagination for menu item listings
- 🛒 Add a full shopping cart system for online ordering
- 🧪 Add unit and integration tests (Jest/Mocha)
- ☁️ Deploy to cloud (Render/Railway + MongoDB Atlas)
- 📱 Add a mobile-responsive hamburger menu
- 🔍 Add search functionality for menu items
- ⭐ Add customer reviews and ratings for dishes

---

## Author

**Huzaifa Shaikh**
- GitHub: [@huzaifashaikh18](https://github.com/huzaifashaikh18)
- Project Repository: [restaurant-management-system](https://github.com/huzaifashaikh18/restaurant-management-system)

---

## License

This project is created for educational purposes as part of a Web Development course.
