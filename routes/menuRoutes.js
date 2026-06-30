const express = require('express');
const router  = express.Router();

const { getMenu, getMenuItemDetails } = require('../controllers/menuController');

router.get('/menu', getMenu);
router.get('/menu/:id', getMenuItemDetails);

module.exports = router;