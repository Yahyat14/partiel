const express = require('express');
const router = express.Router();

const productController = require('../controllers/productController');
const { adminMiddleware } = require('../middleware/auth');

// GET - All products
router.get('/', productController.getAllProducts);

// GET - Product by ID
router.get('/:id', productController.getProductById);

// GET - Categories
router.get('/categories', productController.getCategories);

// POST - Create product (admin only)
router.post('/', adminMiddleware, productController.createProduct);

// PUT - Update product (admin only)
router.put('/:id', adminMiddleware, productController.updateProduct);

// DELETE - Delete product (admin only)
router.delete('/:id', adminMiddleware, productController.deleteProduct);

module.exports = router;

