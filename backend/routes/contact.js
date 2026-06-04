const express = require('express');
const router = express.Router();

// POST - Submit contact form
router.post('/', (req, res) => {
  res.json({ message: 'Submit contact - to be implemented' });
});

// GET - Get all contact messages (admin only)
router.get('/', (req, res) => {
  res.json({ message: 'Get contact messages - to be implemented' });
});

// GET - Get contact message by ID (admin only)
router.get('/:id', (req, res) => {
  res.json({ message: 'Get contact message - to be implemented' });
});

module.exports = router;
