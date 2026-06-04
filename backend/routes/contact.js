const express = require("express");
const router = express.Router();
const contactController = require("../controllers/contactController");
const { adminMiddleware } = require("../middleware/auth");

router.post("/", contactController.submitContact);
router.get("/", adminMiddleware, contactController.getAllContacts);
router.get("/:id", adminMiddleware, contactController.getContactById);
router.put("/:id/reply", adminMiddleware, contactController.replyContact);
router.delete("/:id", adminMiddleware, contactController.deleteContact);

module.exports = router;
