const express = require("express");
const router = express.Router();
const workshopController = require("../controllers/workshopController");
const { authMiddleware, adminMiddleware } = require("../middleware/auth");

router.get("/", workshopController.getAllWorkshops);
router.get("/:id", workshopController.getWorkshopById);
router.post("/", adminMiddleware, workshopController.createWorkshop);
router.put("/:id", adminMiddleware, workshopController.updateWorkshop);
router.delete("/:id", adminMiddleware, workshopController.deleteWorkshop);
router.post("/:id/register", authMiddleware, workshopController.registerWorkshop);
router.delete("/:id/register", authMiddleware, workshopController.unregisterWorkshop);

module.exports = router;
