import './App.css'

const App = () => {
  return (
    <div className="page">
      <header className="header">
        <div className="container headerInner">
          <div className="brand">Coffee Arts Paris</div>
          <nav className="nav">
            <a href="#home">Accueil</a>
            <a href="#shop">Boutique</a>
            <a href="#workshops">Ateliers</a>
            <a href="#blog">Blog</a>
            <a href="#contact">Contact</a>
          </nav>
        </div>
      </header>

      <main>
        <section id="home" className="hero">
          <div className="container heroGrid">
            <div>
              <h1>Le café, l’art & l’artisanat.</h1>
              <p>
                Découvre nos produits, réserve un atelier et lis nos articles.
                (UI à brancher sur l’API.)
              </p>
              <div className="heroActions">
                <a className="btn" href="#shop">Découvrir la boutique</a>
                <a className="btn btnGhost" href="#workshops">Réserver un atelier</a>
              </div>
            </div>
            <div className="heroCard">
              <div className="heroCardTitle">Atelier du mois</div>
              <div className="heroCardBody">
                <div className="pill">Places limitées</div>
                <div className="heroCardName">Dégustation & latte-art</div>
                <div className="muted">Chaque réservation est confirmée sous peu.</div>
              </div>
            </div>
          </div>
        </section>

        <section id="shop" className="section">
          <div className="container">
            <h2>Boutique</h2>
            <div className="grid">
              {Array.from({ length: 6 }).map((_, idx) => (
                <div className="card" key={idx}>
                  <div className="cardImg" />
                  <div className="cardTitle">Produit #{idx + 1}</div>
                  <div className="cardPrice">—</div>
                  <button className="cardBtn" type="button">Voir</button>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="workshops" className="section sectionAlt">
          <div className="container">
            <h2>Ateliers</h2>
            <div className="grid">
              {Array.from({ length: 4 }).map((_, idx) => (
                <div className="card" key={idx}>
                  <div className="cardImg cardImgTall" />
                  <div className="cardTitle">Atelier #{idx + 1}</div>
                  <div className="cardPrice">—</div>
                  <button className="cardBtn" type="button">Réserver</button>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="blog" className="section">
          <div className="container">
            <h2>Blog</h2>
            <div className="grid">
              {Array.from({ length: 3 }).map((_, idx) => (
                <div className="card" key={idx}>
                  <div className="cardImg cardImgBlog" />
                  <div className="cardTitle">Article #{idx + 1}</div>
                  <div className="muted">Résumé à venir (API)</div>
                  <button className="cardBtn" type="button">Lire</button>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="contact" className="section sectionAlt">
          <div className="container">
            <h2>Contact</h2>
            <div className="contactGrid">
              <div className="contactBox">
                <div className="muted">Formulaire à brancher sur /api/contact</div>
                <form className="form">
                  <input name="name" placeholder="Nom" className="input" />
                  <input name="email" placeholder="Email" className="input" />
                  <input name="subject" placeholder="Sujet" className="input" />
                  <textarea name="message" placeholder="Message" className="input textarea" />
                  <button className="btn" type="button">Envoyer</button>
                </form>
              </div>
              <div className="contactInfo">
                <div className="infoItem"><b>Adresse</b><div className="muted">À compléter</div></div>
                <div className="infoItem"><b>Horaires</b><div className="muted">À compléter</div></div>
                <div className="infoItem"><b>Email</b><div className="muted">contact@coffeeartsparis.fr</div></div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="footer">
        <div className="container footerInner">
          <div>© {new Date().getFullYear()} Coffee Arts Paris</div>
          <div className="muted">UI skeleton proche de la charte — data API à brancher</div>
        </div>
      </footer>
    </div>
  )
}

export default App

