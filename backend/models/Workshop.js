const mongoose = require("mongoose");

const workshopSchema = new mongoose.Schema({
  title: { type: String, required: true, trim: true },
  description: { type: String, default: "" },
  image: { type: String, default: "" },
  category: {
    type: String,
    enum: ["ceramic", "barista", "latte-art"],
    default: "ceramic",
  },
  instructor: { type: String, default: "" },
  date: { type: Date, required: true },
  time: { type: String, default: "14:00" },
  duration: { type: Number, default: 2 },
  capacity: { type: Number, default: 8 },
  maxParticipants: { type: Number, default: 8 },
  price: { type: Number, default: 0 },
  level: {
    type: String,
    enum: ["beginner", "intermediate", "advanced"],
    default: "beginner",
  },
  materials: [String],
  registrations: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
  isActive: { type: Boolean, default: true },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Workshop", workshopSchema);
