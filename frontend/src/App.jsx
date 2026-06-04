import { NavLink, Route, Routes } from "react-router-dom";
import { useMemo, useState } from "react";
import "./App.css";
import Home from "./pages/Home.jsx";
import Carte from "./pages/Carte.jsx";
import {
  About,
  Account,
  AdminDashboard,
  Ateliers,
  Blog,
  Boutique,
  Contact,
  Events,
  ProductDetail,
} from "./pages/SitePages.jsx";
import { useCartStore } from "./store/useCartStore.js";

const navItems = [
  { label: "Café", to: "/carte" },
  { label: "Céramique", to: "/ateliers" },
  { label: "Boutique", to: "/boutique" },
  { label: "Événements", to: "/evenements" },
  { label: "Blog", to: "/blog" },
  { label: "À propos", to: "/a-propos" },
  { label: "Contact", to: "/contact" },
  { label: "Admin", to: "/admin" },
];

const PlaceholderPage = ({ title, text }) => (
  <main className="placeholder-page">
    <div className="container">
      <p className="eyebrow">Coffee Arts Paris</p>
      <h1>{title}</h1>
      <p>{text}</p>
      <NavLink className="btn btn-primary" to="/">
        Retour à l'accueil
      </NavLink>
    </div>
  </main>
);

function App() {
  const [cartOpen, setCartOpen] = useState(false);
  const { items, removeItem, updateQuantity } = useCartStore();

  const cartTotal = useMemo(
    () =>
      items.reduce((total, item) => {
        const price = Number.parseFloat(String(item.price).replace(",", "."));
        return total + (Number.isNaN(price) ? 0 : price * item.quantity);
      }, 0),
    [items],
  );

  const cartCount = items.reduce((count, item) => count + item.quantity, 0);

  return (
    <div className="app-shell">
      <header className="app-header">
        <div className="container header-inner">
          <NavLink className="brand" to="/" aria-label="Coffee Arts Paris">
            <span className="brand-mark">CA</span>
            <span>
              <span className="brand-name">Coffee Arts</span>
              <span className="brand-city">Paris</span>
            </span>
          </NavLink>

          <nav className="nav-menu" aria-label="Navigation principale">
            {navItems.map((item) => (
              <NavLink className="nav-link" key={item.to} to={item.to}>
                {item.label}
              </NavLink>
            ))}
          </nav>

          <div className="header-actions">
            <button className="icon-btn" type="button" aria-label="Rechercher">
              <span aria-hidden="true">⌕</span>
            </button>
            <button
              className="icon-btn"
              type="button"
              aria-label="Ouvrir le panier"
              onClick={() => setCartOpen(true)}
            >
              <span aria-hidden="true">◐</span>
              {cartCount > 0 && <span className="badge">{cartCount}</span>}
            </button>
            <button className="icon-btn" type="button" aria-label="Compte client">
              <span aria-hidden="true">◎</span>
            </button>
          </div>
        </div>
      </header>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/carte" element={<Carte />} />
        <Route path="/ateliers" element={<Ateliers />} />
        <Route path="/boutique" element={<Boutique />} />
        <Route path="/boutique/:id" element={<ProductDetail />} />
        <Route path="/evenements" element={<Events />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/a-propos" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/espace-client" element={<Account />} />
        <Route path="/admin" element={<AdminDashboard />} />
        <Route
          path="*"
          element={
            <PlaceholderPage
              title="Page en préparation"
              text="Cette rubrique arrive bientôt. En attendant, l'accueil présente l'univers du lieu."
            />
          }
        />
      </Routes>

      <footer className="app-footer">
        <div className="container footer-grid">
          <div className="footer-brand">
            <div className="footer-logo">Coffee Arts Paris</div>
            <p>
              Un lieu unique où la céramique rencontre le café artisanal à Paris.
              Créer, déguster, partager.
            </p>
            <div className="social-links" aria-label="Réseaux sociaux">
              <a href="https://www.instagram.com/" aria-label="Instagram">
                IG
              </a>
              <a href="https://www.tiktok.com/" aria-label="TikTok">
                TT
              </a>
            </div>
          </div>

          <div>
            <h3>Découvrir</h3>
            <div className="footer-links-grid">
              {navItems.map((item) => (
                <NavLink className="footer-link" key={item.to} to={item.to}>
                  {item.label}
                </NavLink>
              ))}
              <NavLink className="footer-link" to="/espace-client">
                Espace client
              </NavLink>
            </div>
          </div>

          <div>
            <h3>Contact</h3>
            <ul className="footer-list">
              <li>07.66.91.82.94</li>
              <li>coffeeartsparis@gmail.com</li>
              <li>25 Boulevard du Temple</li>
              <li>75003 Paris</li>
            </ul>
          </div>

          <div>
            <h3>Horaires</h3>
            <ul className="footer-list">
              <li>Mardi - Vendredi</li>
              <li>08h - 20h</li>
              <li>Samedi - Dimanche</li>
              <li>10h - 21h</li>
            </ul>
          </div>
        </div>

        <div className="container footer-bottom">
          <p>© 2026 Coffee Arts Paris. Tous droits réservés.</p>
          <div className="footer-legal">
            <a href="#">Politique de confidentialité</a>
            <a href="#">Mentions légales</a>
            <a href="#">CGV</a>
          </div>
        </div>
      </footer>

      <div
        className={`cart-drawer-overlay ${cartOpen ? "open" : ""}`}
        onClick={() => setCartOpen(false)}
      >
        <aside className="cart-drawer" onClick={(event) => event.stopPropagation()}>
          <div className="cart-header">
            <h2>Panier</h2>
            <button className="icon-btn" type="button" onClick={() => setCartOpen(false)}>
              ×
            </button>
          </div>
          <div className="cart-items-container">
            {items.length === 0 ? (
              <p>Votre panier est vide pour le moment.</p>
            ) : (
              items.map((item) => (
                <article className="cart-item" key={item._id}>
                  <img className="cart-item-img" src={item.image || item.img} alt="" />
                  <div className="cart-item-info">
                    <h3 className="cart-item-title">{item.name || item.title}</h3>
                    <p className="cart-item-price">{item.price} €</p>
                    <div className="cart-item-qty">
                      <button type="button" onClick={() => updateQuantity(item._id, item.quantity - 1)}>
                        -
                      </button>
                      <span>{item.quantity}</span>
                      <button type="button" onClick={() => updateQuantity(item._id, item.quantity + 1)}>
                        +
                      </button>
                      <button type="button" onClick={() => removeItem(item._id)}>
                        Retirer
                      </button>
                    </div>
                  </div>
                </article>
              ))
            )}
          </div>
          <div className="cart-footer">
            <div className="cart-total-row">
              <span>Total</span>
              <span>{cartTotal.toFixed(2)} €</span>
            </div>
            <button className="btn btn-primary" type="button">
              Commander
            </button>
          </div>
        </aside>
      </div>
    </div>
  );
}

export default App;
