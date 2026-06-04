import { Link } from "react-router-dom";

const experiences = [
  {
    badge: "DÉGUSTER",
    title: "Café de spécialité",
    action: "Découvrir la carte",
    link: "/carte",
    image:
      "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?q=80&w=1200&auto=format&fit=crop",
  },
  {
    badge: "CRÉER",
    title: "Ateliers créatifs",
    action: "Participer à un atelier",
    link: "/ateliers",
    image:
      "https://images.unsplash.com/photo-1610701596007-11502861dcfa?q=80&w=1200&auto=format&fit=crop",
  },
  {
    badge: "EMPORTER",
    title: "La boutique",
    action: "Explorer la boutique",
    link: "/boutique",
    image:
      "https://images.unsplash.com/photo-1576092768241-dec231879fc3?q=80&w=1200&auto=format&fit=crop",
  },
];

const galleryImages = [
  "https://images.unsplash.com/photo-1521017432531-fbd92d768814?q=80&w=900&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1610701596007-11502861dcfa?q=80&w=900&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?q=80&w=900&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1565192647048-f997ded87958?q=80&w=900&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1544816155-12df9643f363?q=80&w=900&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1507914372368-b2b085b925a1?q=80&w=900&auto=format&fit=crop",
];

const instagramCards = [
  "atelier du matin",
  "matcha latte",
  "pièces émaillées",
  "pause boulevard",
];

const Home = () => {
  return (
    <main className="home-page">
      <section className="hero-section">
        <div className="hero-media" aria-hidden="true" />
        <div className="hero-shade" aria-hidden="true" />
        <div className="container hero-content">
          <p className="eyebrow">Specialty coffee & pottery studio</p>
          <h1>Sip, create and connect</h1>
          <p className="hero-lead">
            Un lieu hybride où l'on vient savourer un café, créer de ses mains
            et partager un moment, simplement.
          </p>
          <p className="hero-address">25 boulevard du Temple, 75003 Paris</p>
          <div className="hero-actions">
            <Link className="btn btn-secondary" to="/ateliers">
              Réserver un atelier
            </Link>
            <Link className="btn btn-glass" to="/carte">
              Découvrir la carte
            </Link>
          </div>
        </div>
      </section>

      <section className="section section-light">
        <div className="container">
          <div className="section-heading">
            <h2>Trois expériences, un même lieu</h2>
            <p>
              Un café de spécialité, des ateliers créatifs et une boutique,
              pensés pour se compléter.
            </p>
          </div>

          <div className="experience-grid">
            {experiences.map((experience) => (
              <Link
                className="experience-card"
                key={experience.badge}
                to={experience.link}
                style={{ backgroundImage: `url(${experience.image})` }}
              >
                <span>{experience.badge}</span>
                <h3>{experience.title}</h3>
                <p>{experience.action}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="section gallery-section">
        <div className="container">
          <div className="section-heading">
            <h2>Au cœur de Coffee Arts Paris</h2>
            <p>
              Des images pour découvrir l'ambiance du lieu, ses matières, et les
              instants qui s'y vivent au quotidien.
            </p>
          </div>

          <div className="gallery-mosaic">
            {galleryImages.map((image, index) => (
              <figure className={`gallery-tile tile-${index + 1}`} key={image}>
                <img src={image} alt="" />
              </figure>
            ))}
          </div>
        </div>
      </section>

      <section className="section social-section">
        <div className="container">
          <div className="section-heading">
            <h2>Instants Coffee Arts Paris</h2>
            <p>
              Nos dernières inspirations, nos moments créatifs et la vie du café
              à retrouver sur Instagram.
            </p>
          </div>

          <div className="instagram-grid">
            {instagramCards.map((label, index) => (
              <article className="instagram-card" key={label}>
                <img src={galleryImages[index + 1]} alt="" />
                <div>
                  <span>@coffeeartsparis</span>
                  <p>{label}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="cta-section">
        <div className="container cta-inner">
          <p className="eyebrow">Créer, déguster, partager</p>
          <h2>
            Un moment autour du café
            <br />
            et de la création
          </h2>
          <p>
            Un lieu où l'on vient créer, discuter, boire un café et s'attarder.
            Des moments simples, à vivre et à partager.
          </p>
          <div className="hero-actions">
            <Link className="btn btn-secondary" to="/ateliers">
              Découvrir les ateliers
            </Link>
            <Link className="btn btn-glass" to="/boutique">
              Accéder à la boutique
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
};

export default Home;
