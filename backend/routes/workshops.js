const express = require('express');
const router = express.Router();

const workshopController = require('../controllers/workshopController');
const { authMiddleware, adminMiddleware } = require('../middleware/auth');

// GET - All workshops
router.get('/', workshopController.getAllWorkshops);

// GET - Workshop by ID
router.get('/:id', workshopController.getWorkshopById);

// POST - Create workshop (admin only)
router.post('/', adminMiddleware, workshopController.createWorkshop);

// PUT - Update workshop (admin only)
router.put('/:id', adminMiddleware, workshopController.updateWorkshop);

// DELETE - Delete workshop (admin only)
router.delete('/:id', adminMiddleware, workshopController.deleteWorkshop);

// POST - Register for workshop (client)
router.post('/:id/register', authMiddleware, workshopController.registerWorkshop);

// POST - Unregister from workshop (client)
router.post('/:id/unregister', authMiddleware, workshopController.unregisterWorkshop);

module.exports = router;

