const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const { authMiddleware } = require('../middleware/auth');

// POST - User registration
router.post('/register', authController.register);

// POST - User login
router.post('/login', authController.login);

// POST - Admin login
router.post('/admin-login', authController.adminLogin);

// GET - Get current user
router.get('/me', authMiddleware, authController.getCurrentUser);

// POST - Logout
router.post('/logout', authController.logout);

module.exports = router;
