const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

/* =========================
   DATA (SIMULATION DB)
========================= */

let products = [
  {
    id: 1,
    name: "Café Signature",
    price: "14€",
    image: "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085"
  },
  {
    id: 2,
    name: "Tasse Artisanale",
    price: "22€",
    image: "https://images.unsplash.com/photo-1517705008128-361805f42e86"
  },
  {
    id: 3,
    name: "Café Éthiopien",
    price: "18€",
    image: "https://images.unsplash.com/photo-1509042239860-f550ce710b93"
  }
];

let reservations = [];
let messages = [];

/* =========================
   PRODUCTS ROUTES
========================= */

// GET all products
app.get("/products", (req, res) => {
  res.json(products);
});

// UPDATE product (ADMIN)
app.put("/products/:id", (req, res) => {
  const id = parseInt(req.params.id);

  products = products.map((p) =>
    p.id === id ? { ...p, ...req.body } : p
  );

  res.json({
    success: true,
    message: "Produit mis à jour",
    products,
  });
});

/* =========================
   RESERVATIONS
========================= */

app.post("/reservations", (req, res) => {
  const reservation = {
    id: Date.now(),
    ...req.body,
  };

  reservations.push(reservation);

  console.log("📌 Nouvelle réservation :", reservation);

  res.json({
    success: true,
    message: "Réservation enregistrée",
  });
});

app.get("/reservations", (req, res) => {
  res.json(reservations);
});

/* =========================
   CONTACT MESSAGES
========================= */

app.post("/contact", (req, res) => {
  const message = {
    id: Date.now(),
    ...req.body,
  };

  messages.push(message);

  console.log("📩 Nouveau message :", message);

  res.json({
    success: true,
    message: "Message envoyé",
  });
});

app.get("/contact", (req, res) => {
  res.json(messages);
});

/* =========================
   SERVER START
========================= */

const PORT = 5000;

app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});