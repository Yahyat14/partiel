const express = require('express');
const router = express.Router();

const userController = require('../controllers/userController');
const { authMiddleware, adminMiddleware } = require('../middleware/auth');

// GET - Get user profile
router.get('/profile', authMiddleware, userController.getUserProfile);

// PUT - Update user profile
router.put('/profile', authMiddleware, userController.updateUserProfile);

// POST - Change password
router.post('/profile/change-password', authMiddleware, userController.changePassword);

// GET - All users (admin only)
router.get('/', adminMiddleware, userController.getAllUsers);

// GET - Get user by ID (admin only)
router.get('/:id', adminMiddleware, userController.getUserById);

// PUT - Update user (admin only)
router.put('/:id', adminMiddleware, userController.updateUser);

// DELETE - Delete user (admin only)
router.delete('/:id', adminMiddleware, userController.deleteUser);

module.exports = router;

