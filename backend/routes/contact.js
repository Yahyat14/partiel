const express = require('express');
const router = express.Router();

const contactController = require('../controllers/contactController');
const { authMiddleware, adminMiddleware } = require('../middleware/auth');

// POST - Submit contact form
router.post('/', contactController.submitContact);

// GET - Get all contact messages (admin only)
router.get('/', adminMiddleware, contactController.getAllContacts);

// GET - Get contact message by ID (admin only)
router.get('/:id', adminMiddleware, contactController.getContactById);

// POST - Reply to contact (admin only)
router.post('/:id/reply', adminMiddleware, contactController.replyContact);

// DELETE - Delete contact (admin only)
router.delete('/:id', adminMiddleware, contactController.deleteContact);

module.exports = router;

