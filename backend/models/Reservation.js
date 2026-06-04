const mongoose = require("mongoose");

const reservationSchema = new mongoose.Schema({
  reservationNumber: { type: String, unique: true, sparse: true },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  workshopId: { type: mongoose.Schema.Types.ObjectId, ref: "Workshop" },
  title: { type: String, default: "" },
  quantity: { type: Number, default: 1, min: 1 },
  price: { type: Number, default: 0 },
  participants: [
    {
      firstName: String,
      lastName: String,
      email: String,
    },
  ],
  status: {
    type: String,
    enum: ["pending", "confirmed", "cancelled"],
    default: "pending",
  },
  notes: { type: String, default: "" },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Reservation", reservationSchema);
