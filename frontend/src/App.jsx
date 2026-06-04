import "./App.css";

function App() {
  return (
    <>
      <header className="header">
        <div className="header-left">
          <i className="fa-solid fa-mug-hot"></i>
        </div>

        <div className="logo">
          <h2>Coffee Arts</h2>
          <span>Paris</span>
        </div>

        <div className="header-right">
          <i className="fa-solid fa-magnifying-glass"></i>
          <i className="fa-solid fa-bag-shopping"></i>
          <i className="fa-regular fa-user"></i>
        </div>
      </header>

      <section className="hero">
        <div className="overlay"></div>

        <div className="hero-content">
          <h1>Specialty Coffee & Pottery</h1>

          <p>
            Un lieu où le café de spécialité rencontre la créativité.
          </p>

          <button>Découvrir</button>
        </div>
      </section>

      <section className="section">
        <h2>Trois expériences</h2>

        <div className="cards">
          <div className="card">
            <img
              src="https://images.unsplash.com/photo-1495474472287-4d71bcdd2085"
              alt=""
            />
            <div className="card-content">
              <span>DÉGUSTER</span>
              <h3>Café de spécialité</h3>
            </div>
          </div>

          <div className="card">
            <img
              src="https://images.unsplash.com/photo-1517048676732-d65bc937f952"
              alt=""
            />
            <div className="card-content">
              <span>CRÉER</span>
              <h3>Ateliers créatifs</h3>
            </div>
          </div>

          <div className="card">
            <img
              src="https://images.unsplash.com/photo-1511920170033-f8396924c348"
              alt=""
            />
            <div className="card-content">
              <span>EMPORTER</span>
              <h3>La boutique</h3>
            </div>
          </div>
        </div>
      </section>

      <section className="section">
        <h2>Nos produits</h2>

        <div className="products">
          <div className="product">
            <img
              src="https://images.unsplash.com/photo-1509042239860-f550ce710b93"
              alt=""
            />
            <h4>Café Signature</h4>
            <p>12 €</p>
          </div>

          <div className="product">
            <img
              src="https://images.unsplash.com/photo-1570486919984-55f9de7b2f2f"
              alt=""
            />
            <h4>Mug Artisanal</h4>
            <p>24 €</p>
          </div>

          <div className="product">
            <img
              src="https://images.unsplash.com/photo-1517705008128-361805f42e86"
              alt=""
            />
            <h4>Matcha Premium</h4>
            <p>30 €</p>
          </div>
        </div>
      </section>

      <section className="cta">
        <h2>Créer, partager, savourer</h2>

        <p>
          Rejoignez notre univers entre café, artisanat et créativité.
        </p>

        <div className="cta-buttons">
          <button className="green-btn">
            Ateliers
          </button>

          <button className="peach-btn">
            Boutique
          </button>
        </div>
      </section>

      <footer>
        <div className="footer-grid">
          <div>
            <h3>Coffee Arts</h3>

            <p>
              Un lieu unique où la céramique rencontre le café artisanal.
            </p>
          </div>

          <div>
            <h4>Découvrir</h4>

            <ul>
              <li>Café</li>
              <li>Ateliers</li>
              <li>Boutique</li>
            </ul>
          </div>

          <div>
            <h4>Contact</h4>

            <ul>
              <li>Paris</li>
              <li>contact@coffeearts.fr</li>
              <li>07 00 00 00 00</li>
            </ul>
          </div>
        </div>
      </footer>
    </>
  );
}

export default App;