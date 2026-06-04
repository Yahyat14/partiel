const express = require('express');
const router = express.Router();

// GET - All products
router.get('/', (req, res) => {
  res.json({ message: 'Get all products - to be implemented' });
});

// GET - Product by ID
router.get('/:id', (req, res) => {
  res.json({ message: 'Get product by ID - to be implemented' });
});

// POST - Create product (admin only)
router.post('/', (req, res) => {
  res.json({ message: 'Create product - to be implemented' });
});

// PUT - Update product (admin only)
router.put('/:id', (req, res) => {
  res.json({ message: 'Update product - to be implemented' });
});

// DELETE - Delete product (admin only)
router.delete('/:id', (req, res) => {
  res.json({ message: 'Delete product - to be implemented' });
});

module.exports = router;
