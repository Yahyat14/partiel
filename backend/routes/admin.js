const express = require("express");
const router = express.Router();
const Blog = require("../models/Blog");
const Contact = require("../models/Contact");
const Order = require("../models/Order");
const Product = require("../models/Product");
const Reservation = require("../models/Reservation");
const User = require("../models/User");
const Workshop = require("../models/Workshop");
const { adminMiddleware } = require("../middleware/auth");

router.get("/stats", adminMiddleware, async (req, res) => {
  try {
    const [
      products,
      workshops,
      orders,
      reservations,
      contacts,
      users,
      blogPosts,
      revenue,
    ] = await Promise.all([
      Product.countDocuments({ isActive: true }),
      Workshop.countDocuments({ isActive: true }),
      Order.countDocuments(),
      Reservation.countDocuments(),
      Contact.countDocuments(),
      User.countDocuments(),
      Blog.countDocuments({ isPublished: true }),
      Order.aggregate([
        { $match: { paymentStatus: "completed" } },
        { $group: { _id: null, total: { $sum: "$total" } } },
      ]),
    ]);

    res.json({
      products,
      workshops,
      orders,
      reservations,
      contacts,
      users,
      blogPosts,
      revenue: revenue[0]?.total || 0,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get("/cloudinary-config", adminMiddleware, (req, res) => {
  res.json({
    cloudName: process.env.CLOUDINARY_CLOUD_NAME || "",
    uploadPreset: process.env.CLOUDINARY_UPLOAD_PRESET || "",
  });
});

module.exports = router;
