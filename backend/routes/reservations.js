const express = require('express');
const router = express.Router();

const reservationController = require('../controllers/reservationController');
const { authMiddleware, adminMiddleware } = require('../middleware/auth');

// GET - All reservations (admin) or user's reservations (client)
router.get('/', authMiddleware, reservationController.getReservations);

// GET - Reservation by ID
router.get('/:id', authMiddleware, reservationController.getReservationById);

// POST - Create reservation
router.post('/', authMiddleware, reservationController.createReservation);

// PUT - Update reservation (admin only)
router.put('/:id', adminMiddleware, reservationController.updateReservation);

// DELETE - Cancel reservation (client)
router.delete('/:id', authMiddleware, reservationController.cancelReservation);


module.exports = router;

