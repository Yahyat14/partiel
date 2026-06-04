import { NavLink, Route, Routes, useLocation } from "react-router-dom";
import { useEffect, useMemo, useState } from "react";
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

const mainNav = [
  {
    label: "Café",
    to: "/carte",
    submenu: [
      { label: "La carte", to: "/carte" },
      { label: "Torréfaction", to: "/carte" },
      { label: "Nos torréfacteurs", to: "/carte" },
    ],
  },
  { label: "Céramique", to: "/ateliers" },
  { label: "Boutique", to: "/boutique" },
  { label: "Événements", to: "/evenements" },
];

const secondaryNav = [
  { label: "Blog", to: "/blog" },
  { label: "Nos engagements", to: "/apropos" },
  { label: "Contact", to: "/contact" },
  { label: "Espace client", to: "/espace-client" },
];

const discoverCol1 = [
  { label: "Café", to: "/carte" },
  { label: "Céramique", to: "/ateliers" },
  { label: "Boutique", to: "/boutique" },
  { label: "Événements", to: "/evenements" },
];

const discoverCol2 = secondaryNav;

const InstagramIcon = () => (
  <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2">
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
  </svg>
);

const PinterestIcon = () => (
  <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor">
    <path d="M12 2C6.48 2 2 6.48 2 12c0 4.42 2.75 8.17 6.56 9.71-.08-.65-.14-1.65.03-2.36.15-.64.98-4.32.98-4.32s-.25-.5-.25-1.24c0-1.16.67-2.03 1.51-2.03.71 0 1.05.53 1.05 1.17 0 .71-.45 1.77-.68 2.75-.19.81.41 1.47 1.22 1.47 1.46 0 2.59-1.54 2.59-3.77 0-1.97-1.42-3.35-3.45-3.35-2.35 0-3.73 1.76-3.73 3.58 0 .71.27 1.47.62 1.88.07.08.08.15.06.23l-.25.98c-.04.17-.14.2-.33.12-1.24-.58-2.02-2.4-2.02-3.86 0-3.16 2.3-6.06 6.65-6.06 3.5 0 6.22 2.49 6.22 5.82 0 3.48-2.19 6.28-5.23 6.28-1.02 0-1.98-.53-2.31-1.23l-.63 2.4c-.23.89-.85 2.01-1.27 2.69.96.3 1.98.45 3.02.45 5.52 0 10-4.48 10-10S17.52 2 12 2z" />
  </svg>
);

const SearchIcon = () => (
  <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2">
    <circle cx="11" cy="11" r="8" />
    <path d="m21 21-4.3-4.3" />
  </svg>
);

const BagIcon = () => (
  <svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z" />
    <path d="M3 6h18" />
    <path d="M16 10a4 4 0 0 1-8 0" />
  </svg>
);

const MenuIcon = () => (
  <svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2">
    <line x1="4" x2="20" y1="6" y2="6" />
    <line x1="4" x2="20" y1="12" y2="12" />
    <line x1="4" x2="20" y1="18" y2="18" />
  </svg>
);

const PlaceholderPage = ({ title, text }) => (
  <main className="placeholder-page">
    <div className="container-wide">
      <h1>{title}</h1>
      <p>{text}</p>
      <NavLink className="btn-primary" to="/">
        Retour à l&apos;accueil
      </NavLink>
    </div>
  </main>
);

function App() {
  const location = useLocation();
  const isHome = location.pathname === "/";
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
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
  const headerSolid = !isHome || scrolled;

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setMenuOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    document.body.style.overflow = menuOpen || cartOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen, cartOpen]);

  return (
    <div className="app-shell">
      <header className={`site-header ${headerSolid ? "site-header--solid" : "site-header--transparent"}`}>
        <div className="header-bar">
          <div className="header-left">
            <button
              type="button"
              className="header-icon-btn header-menu-btn"
              aria-label="Ouvrir le menu"
              onClick={() => setMenuOpen(true)}
            >
              <MenuIcon />
            </button>

            <nav className="header-nav-desktop" aria-label="Navigation principale">
              {mainNav.map((item) =>
                item.submenu ? (
                  <div className="nav-item-dropdown" key={item.to}>
                    <NavLink
                      className={({ isActive }) =>
                        `nav-link ${isActive ? "nav-link--active" : ""}`
                      }
                      to={item.to}
                    >
                      {item.label}
                    </NavLink>
                    <div className="nav-dropdown">
                      {item.submenu.map((sub) => (
                        <NavLink key={sub.to + sub.label} to={sub.to}>
                          {sub.label}
                        </NavLink>
                      ))}
                    </div>
                  </div>
                ) : (
                  <NavLink
                    className={({ isActive }) =>
                      `nav-link ${isActive ? "nav-link--active" : ""}`
                    }
                    key={item.to}
                    to={item.to}
                  >
                    {item.label}
                  </NavLink>
                ),
              )}
            </nav>
          </div>

          <NavLink className="header-logo" to="/" aria-label="Coffee Arts Paris">
            <img
              src={headerSolid ? "/Fichier-129.png" : "/Fichier-128.png"}
              alt="Coffee Arts Paris"
            />
          </NavLink>

          <div className="header-right">
            <nav className="header-nav-secondary" aria-label="Navigation secondaire">
              {secondaryNav.map((item) => (
                <NavLink
                  className={({ isActive }) =>
                    `nav-link ${isActive ? "nav-link--active" : ""}`
                  }
                  key={item.to}
                  to={item.to}
                >
                  {item.label}
                </NavLink>
              ))}
            </nav>

            <button
              type="button"
              className="header-icon-btn"
              aria-label="Rechercher"
            >
              <SearchIcon />
            </button>

            <button
              type="button"
              className="header-icon-btn header-cart-btn"
              aria-label="Ouvrir le panier"
              onClick={() => setCartOpen(true)}
            >
              <BagIcon />
              {cartCount > 0 && (
                <span className="header-cart-badge">
                  {cartCount > 9 ? "9+" : cartCount}
                </span>
              )}
            </button>

            <NavLink
              className="header-icon-btn header-account-btn"
              to="/espace-client"
              aria-label="Espace client"
            >
              <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                <circle cx="12" cy="7" r="4" />
              </svg>
            </NavLink>
          </div>
        </div>
      </header>

      <div className={`mobile-menu ${menuOpen ? "mobile-menu--open" : ""}`}>
        <div className="mobile-menu-panel">
          <button
            type="button"
            className="mobile-menu-close"
            aria-label="Fermer le menu"
            onClick={() => setMenuOpen(false)}
          >
            ×
          </button>
          <nav className="mobile-menu-nav">
            {[...mainNav, ...secondaryNav].map((item) => (
              <NavLink key={item.to} to={item.to} onClick={() => setMenuOpen(false)}>
                {item.label}
              </NavLink>
            ))}
          </nav>
        </div>
        <button
          type="button"
          className="mobile-menu-backdrop"
          aria-label="Fermer le menu"
          onClick={() => setMenuOpen(false)}
        />
      </div>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/carte" element={<Carte />} />
        <Route path="/ateliers" element={<Ateliers />} />
        <Route path="/boutique" element={<Boutique />} />
        <Route path="/boutique/:id" element={<ProductDetail />} />
        <Route path="/evenements" element={<Events />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/apropos" element={<About />} />
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

      <footer className="site-footer">
        <div className="footer-accent-line" aria-hidden="true" />
        <div className="container-wide footer-grid">
          <div className="footer-brand">
            <NavLink to="/">
              <img src="/Fichier-95.png" alt="Coffee Arts Paris" className="footer-logo-img" />
            </NavLink>
            <ul className="footer-taglines">
              <li>Un lieu unique où la céramique</li>
              <li>rencontre le café artisanal à Paris.</li>
              <li>Créer, déguster, partager.</li>
            </ul>
            <div className="footer-socials">
              <a
                href="https://www.instagram.com/coffeearts.paris/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram Coffee Arts Paris"
              >
                <InstagramIcon />
              </a>
              <a
                href="https://www.tiktok.com/@coffeeartsparis"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="TikTok Coffee Arts Paris"
                className="tiktok-link"
              >
                <img src="/tiktok-beige.png" alt="" className="tiktok-icon tiktok-icon--default" />
                <img src="/tiktok-green.png" alt="" className="tiktok-icon tiktok-icon--hover" />
              </a>
              <a
                href="https://fr.pinterest.com/coffeeartsparis/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Pinterest Coffee Arts Paris"
              >
                <PinterestIcon />
              </a>
            </div>
          </div>

          <div className="footer-discover">
            <h3>Découvrir</h3>
            <div className="footer-discover-cols">
              <ul>
                {discoverCol1.map((item) => (
                  <li key={item.to}>
                    <NavLink to={item.to}>{item.label}</NavLink>
                  </li>
                ))}
              </ul>
              <ul>
                {discoverCol2.map((item) => (
                  <li key={item.to}>
                    <NavLink to={item.to}>{item.label}</NavLink>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="footer-contact">
            <h3>Contact</h3>
            <ul>
              <li>07.66.91.82.94</li>
              <li>
                <a href="mailto:coffeeartsparis@gmail.com">coffeeartsparis@gmail.com</a>
              </li>
              <li>
                <a
                  href="https://www.google.com/maps?q=25+Boulevard+du+Temple+75003+Paris"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  25 Boulevard du Temple
                </a>
              </li>
              <li>
                <a
                  href="https://www.google.com/maps?q=25+Boulevard+du+Temple+75003+Paris"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  75003 Paris
                </a>
              </li>
            </ul>
          </div>

          <div className="footer-hours">
            <h3>Horaires</h3>
            <ul>
              <li>Mardi - Mercredi - Jeudi - Vendredi</li>
              <li className="footer-hours-time">08h - 20h</li>
              <li>Samedi - Dimanche</li>
              <li className="footer-hours-time">10h - 21h</li>
            </ul>
          </div>
        </div>

        <div className="container-wide footer-bottom">
          <p>© 2026 Coffee Arts Paris. Tous droits réservés.</p>
          <div className="footer-payments">
            <img src="/mastercard-png-8.png" alt="Mastercard" />
            <img src="/visa-logo-png-transparent.png" alt="Visa" />
            <img src="/Google_Pay_Logo.svg.webp" alt="Google Pay" />
            <img src="/Apple_Pay-Logo.wine.png" alt="Apple Pay" />
          </div>
          <div className="footer-legal">
            <a href="#">Politique de confidentialité</a>
            <a href="#">Politique cookies</a>
            <a href="#">Mentions légales</a>
            <a href="#">CGV</a>
          </div>
        </div>
      </footer>

      <div className="floating-socials" aria-label="Réseaux sociaux">
        <a
          href="https://www.instagram.com/coffeearts.paris/"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Instagram Coffee Arts Paris"
          style={{ animationDelay: "0.3s" }}
        >
          <InstagramIcon />
        </a>
        <a
          href="https://www.tiktok.com/@coffeeartsparis"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="TikTok Coffee Arts Paris"
          className="tiktok-link"
          style={{ animationDelay: "0.5s" }}
        >
          <img src="/tiktok-beige.png" alt="" className="tiktok-icon tiktok-icon--default" />
          <img src="/tiktok-green.png" alt="" className="tiktok-icon tiktok-icon--hover" />
        </a>
        <a
          href="https://fr.pinterest.com/coffeeartsparis/"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Pinterest Coffee Arts Paris"
          style={{ animationDelay: "0.7s" }}
        >
          <PinterestIcon />
        </a>
      </div>

      <div
        className={`cart-drawer-overlay ${cartOpen ? "open" : ""}`}
        onClick={() => setCartOpen(false)}
      >
        <aside className="cart-drawer" onClick={(event) => event.stopPropagation()}>
          <div className="cart-header">
            <h2>Panier</h2>
            <button className="header-icon-btn" type="button" onClick={() => setCartOpen(false)}>
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
                      <button
                        type="button"
                        onClick={() => updateQuantity(item._id, item.quantity - 1)}
                      >
                        -
                      </button>
                      <span>{item.quantity}</span>
                      <button
                        type="button"
                        onClick={() => updateQuantity(item._id, item.quantity + 1)}
                      >
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
            <button className="btn-primary" type="button">
              Commander
            </button>
          </div>
        </aside>
      </div>
    </div>
  );
}

export default App;
