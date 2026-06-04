const express = require("express");
const router = express.Router();
const reservationController = require("../controllers/reservationController");
const { authMiddleware, adminMiddleware } = require("../middleware/auth");

router.get("/", authMiddleware, reservationController.getReservations);
router.get("/:id", authMiddleware, reservationController.getReservationById);
router.post("/", authMiddleware, reservationController.createReservation);
router.put("/:id", adminMiddleware, reservationController.updateReservation);
router.delete("/:id", authMiddleware, reservationController.cancelReservation);

module.exports = router;
