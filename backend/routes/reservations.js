const express = require('express');
const router = express.Router();

// GET - All reservations
router.get('/', (req, res) => {
  res.json({ message: 'Get reservations - to be implemented' });
});

// GET - Reservation by ID
router.get('/:id', (req, res) => {
  res.json({ message: 'Get reservation by ID - to be implemented' });
});

// POST - Create reservation
router.post('/', (req, res) => {
  res.json({ message: 'Create reservation - to be implemented' });
});

// PUT - Update reservation
router.put('/:id', (req, res) => {
  res.json({ message: 'Update reservation - to be implemented' });
});

// DELETE - Cancel reservation
router.delete('/:id', (req, res) => {
  res.json({ message: 'Delete reservation - to be implemented' });
});

module.exports = router;
