import { Link } from "react-router-dom";

const experiences = [
  {
    badge: "DÉGUSTER",
    title: "Café de spécialité",
    action: "Découvrir la carte",
    link: "/carte",
    image: "/IMG_8509.jpg",
    imageClass: "experience-img experience-img--cafe",
  },
  {
    badge: "CRÉER",
    title: "Ateliers créatifs",
    action: "Participer à un atelier",
    link: "/ateliers",
    image: "/Design.png",
    imageClass: "experience-img",
  },
  {
    badge: "EMPORTER",
    title: "La boutique",
    action: "Explorer la boutique",
    link: "/boutique",
    image: "/image3.jpg",
    imageClass: "experience-img",
  },
];

const galleryImages = [
  "/artisan-coffee-cafe-with-ceramic-pottery-handmade-.jpg",
  "/CERAMIQUE---PHOTO-1.jpg",
  "/SIGNATURES---PHOTO-2.jpg",
  "/SIGNATURES---PHOTO-3.jpg",
  "/SIGNATURES---PHOTO-5.jpg",
  "/SIGNATURES---PHOTO-7.jpg",
  "/test2.jpg",
  "/IMG_8509.jpg",
];

const instagramPosts = [
  { image: galleryImages[0], label: "atelier du matin" },
  { image: galleryImages[2], label: "matcha latte" },
  { image: galleryImages[4], label: "pièces émaillées" },
  { image: galleryImages[5], label: "pause boulevard" },
];

const Home = () => {
  return (
    <div className="home-page">
      <section className="hero-section">
        <div className="hero-video-wrap" aria-hidden="true">
          <video
            autoPlay
            loop
            muted
            playsInline
            className="hero-video"
            src="/hero-video.mov"
          />
          <div className="hero-overlay" />
        </div>

        <div className="hero-inner">
          <h1
            className="hero-title animate-fade-up"
            style={{ animationDelay: "0.4s" }}
          >
            Specialty coffee &amp; pottery studio
          </h1>
          <p
            className="hero-subtitle animate-fade-up"
            style={{ animationDelay: "0.5s" }}
          >
            Sip, create and connect
          </p>
          <p
            className="hero-lead animate-fade-up"
            style={{ animationDelay: "0.6s" }}
          >
            Un lieu hybride où l&apos;on vient savourer un café, créer de ses
            mains et partager un moment, simplement.
          </p>
          <p
            className="hero-address animate-fade-up"
            style={{ animationDelay: "0.65s" }}
          >
            25 boulevard du Temple, 75003 Paris
          </p>
          <div
            className="hero-actions animate-fade-up"
            style={{ animationDelay: "0.8s" }}
          >
            <Link className="btn-hero-primary" to="/ateliers">
              Réserver un atelier
            </Link>
            <Link className="btn-hero-secondary" to="/carte">
              Découvrir la carte
            </Link>
          </div>
        </div>
      </section>

      <section className="experiences-section">
        <div className="container-wide">
          <div className="section-heading">
            <h2 className="section-title">Trois expériences, un même lieu</h2>
            <p className="section-desc">
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
              >
                <img
                  className={experience.imageClass}
                  src={experience.image}
                  alt={experience.title}
                />
                <div className="experience-card-overlay">
                  <div className="experience-card-content">
                    <span className="experience-badge">{experience.badge}</span>
                    <h3>{experience.title}</h3>
                    <span className="experience-action">{experience.action}</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="gallery-section">
        <div className="container-wide">
          <div className="section-heading">
            <h2 className="section-title">Au cœur de Coffee Arts Paris</h2>
            <p className="section-desc">
              Des images pour découvrir l&apos;ambiance du lieu, ses matières, et
              les instants
              <br />
              qui s&apos;y vivent au quotidien.
            </p>
          </div>

          <div className="gallery-grid">
            {galleryImages.map((image) => (
              <figure className="gallery-item" key={image}>
                <img src={image} alt="" loading="lazy" />
              </figure>
            ))}
          </div>
        </div>
      </section>

      <section className="instagram-section">
        <div className="container-wide">
          <div className="section-heading section-heading--tight">
            <h2 className="section-title">Instants Coffee Arts Paris</h2>
            <p className="section-desc section-desc--muted">
              Nos dernières inspirations, nos moments créatifs et la vie du café
              à retrouver sur Instagram.
            </p>
          </div>

          <div className="instagram-grid">
            {instagramPosts.map((post) => (
              <a
                className="instagram-card"
                key={post.label}
                href="https://www.instagram.com/coffeearts.paris/"
                target="_blank"
                rel="noopener noreferrer"
              >
                <img src={post.image} alt="" loading="lazy" />
                <div className="instagram-card-caption">
                  <span>@coffeeartsparis</span>
                  <p>{post.label}</p>
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>

      <section className="cta-section">
        <div className="cta-blur cta-blur--right" aria-hidden="true" />
        <div className="cta-blur cta-blur--left" aria-hidden="true" />
        <div className="container-cta">
          <h2 className="cta-title">
            Un moment autour du café
            <br />
            et de la création
          </h2>
          <p className="cta-desc">
            Un lieu où l&apos;on vient créer, discuter, boire un café et
            s&apos;attarder.
            <br />
            Des moments simples, à vivre et à partager.
          </p>
          <div className="hero-actions">
            <Link className="btn-primary" to="/ateliers">
              Découvrir les ateliers
            </Link>
            <Link className="btn-secondary" to="/boutique">
              Accéder à la boutique
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
