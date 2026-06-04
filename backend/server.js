const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");
const seedData = require("./config/seed");
require("dotenv").config();

const app = express();

// Middlewares
app.use(cors({
  origin: [
    "http://localhost:5173",
    "http://127.0.0.1:5173",
    process.env.FRONTEND_URL,
  ].filter(Boolean),
  credentials: true,
}));
app.use(express.json());

// Routes
app.use("/api/products", require("./routes/products"));
app.use("/api/workshops", require("./routes/workshops"));
app.use("/api/reservations", require("./routes/reservations"));
app.use("/api/contact", require("./routes/contact"));
app.use("/api/auth", require("./routes/auth"));
app.use("/api/orders", require("./routes/orders"));
app.use("/api/blog", require("./routes/blog"));
app.use("/api/users", require("./routes/users"));
app.use("/api/admin", require("./routes/admin"));

app.get("/api/health", (req, res) => {
  res.json({ ok: true, service: "coffee-arts-api" });
});

const PORT = process.env.PORT || 5000;

connectDB().then(async () => {
  if (process.env.SEED_ON_START !== "false") {
    await seedData();
  }

  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
});
