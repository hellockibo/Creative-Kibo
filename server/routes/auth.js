const express = require('express');
const { login, logout, checkAuth } = require('../controllers/authController');
const { requireAdmin } = require('../middleware/auth');

const router = express.Router();

router.post('/login', login);
router.post('/logout', logout);
router.get('/check', requireAdmin, checkAuth);

module.exports = router;
