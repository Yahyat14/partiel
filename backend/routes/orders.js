const express = require('express');
const router = express.Router();

const orderController = require('../controllers/orderController');
const { authMiddleware, adminMiddleware } = require('../middleware/auth');

// GET - Order stats (admin only)
router.get('/stats', adminMiddleware, orderController.getOrderStats);

// GET - All orders (admin) or user's orders (client)
router.get('/', authMiddleware, orderController.getOrders);

// GET - Order by ID
router.get('/:id', authMiddleware, orderController.getOrderById);

// POST - Create order
router.post('/', authMiddleware, orderController.createOrder);

// PUT - Update order status (admin only)
router.put('/:id', adminMiddleware, orderController.updateOrder);

module.exports = router;

