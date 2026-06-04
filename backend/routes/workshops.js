const express = require('express');
const router = express.Router();

// GET - All workshops
router.get('/', (req, res) => {
  res.json({ message: 'Get all workshops - to be implemented' });
});

// GET - Workshop by ID
router.get('/:id', (req, res) => {
  res.json({ message: 'Get workshop by ID - to be implemented' });
});

// POST - Create workshop (admin only)
router.post('/', (req, res) => {
  res.json({ message: 'Create workshop - to be implemented' });
});

// PUT - Update workshop (admin only)
router.put('/:id', (req, res) => {
  res.json({ message: 'Update workshop - to be implemented' });
});

// DELETE - Delete workshop (admin only)
router.delete('/:id', (req, res) => {
  res.json({ message: 'Delete workshop - to be implemented' });
});

module.exports = router;
