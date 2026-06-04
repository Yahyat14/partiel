import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  const experiences = [
    {
      title: 'Café de spécialité',
      action: 'Découvrir la carte',
      link: '/carte',
      badge: 'DÉGUSTER',
      img: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?q=80&w=600&auto=format&fit=crop',
    },
    {
      title: 'Ateliers créatifs',
      action: 'Participer à un atelier',
      link: '/ateliers',
      badge: 'CRÉER',
      img: 'https://images.unsplash.com/photo-1595225476474-87563907a212?q=80&w=600&auto=format&fit=crop',
    },
    {
      title: 'La boutique',
      action: 'Explorer la boutique',
      link: '/boutique',
      badge: 'EMPORTER',
      img: 'https://images.unsplash.com/photo-1576092768241-dec231879fc3?q=80&w=600&auto=format&fit=crop',
    },
  ];

  const galleryImages = [
    'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?q=80&w=400&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1565192647048-f997ded87958?q=80&w=400&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1595225476474-87563907a212?q=80&w=400&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1576092768241-dec231879fc3?q=80&w=400&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1517256064527-09c53b2d0bc6?q=80&w=400&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1577937927133-66ef06acdf18?q=80&w=400&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1588850561407-ed78c282e89b?q=80&w=400&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1544816155-12df9643f363?q=80&w=400&auto=format&fit=crop',
  ];

  return (
    <div className="home-page">
      {/* Hero Section */}
      <section style={{
        position: 'relative',
        height: '100vh',
        minHeight: '650px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: '#fff',
        backgroundImage: 'linear-gradient(rgba(0,0,0,0.45), rgba(0,0,0,0.45)), url("https://images.unsplash.com/photo-1498804103079-a6351b050096?q=80&w=1600&auto=format&fit=crop")',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed',
      }}>
        <div className="container" style={{ textAlign: 'center', zIndex: 10 }}>
          <h1 className="animate-fade-up" style={{ 
            color: 'var(--primary-beige)', 
            marginBottom: '16px', 
            fontWeight: 800,
            textShadow: '0 4px 10px rgba(0,0,0,0.3)'
          }}>
            Specialty coffee & pottery studio
          </h1>
          <p className="animate-fade-up" style={{ 
            color: '#fff', 
            fontSize: '1.4rem', 
            marginBottom: '12px', 
            fontWeight: 400,
            letterSpacing: '1px'
          }}>
            Sip, create and connect
          </p>
          <p className="animate-fade-up" style={{ 
            color: 'rgba(255,255,255,0.9)', 
            fontSize: '1.1rem', 
            maxWidth: '650px', 
            margin: '0 auto 16px',
            lineHeight: '1.6'
          }}>
            Un lieu hybride où l'on vient savourer un café, créer de ses mains et partager un moment, simplement.
          </p>
          <p className="animate-fade-up" style={{ 
            color: 'rgba(255,255,255,0.8)', 
            fontSize: '1rem', 
            marginBottom: '32px',
            fontWeight: 500
          }}>
            25 boulevard du Temple, 75003 Paris
          </p>
          <div className="animate-fade-up" style={{ 
            display: 'flex', 
            flexDirection: 'column', 
            gap: '16px', 
            justifyContent: 'center',
            alignItems: 'center'
          }}>
            <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap', justifyContent: 'center' }}>
              <Link to="/ateliers" className="btn btn-secondary" style={{ padding: '16px 36px' }}>
                Réserver un atelier
              </Link>
              <Link to="/carte" className="btn btn-glass" style={{ padding: '16px 36px' }}>
                Découvrir la carte
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Experiences Section */}
      <section style={{ padding: '100px 0', backgroundColor: '#fff' }}>
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: '60px' }}>
            <h2 style={{ color: 'var(--primary-green)', fontWeight: 800 }}>Trois expériences, un même lieu</h2>
            <p style={{ maxWidth: '600px', margin: '0 auto' }}>Un café de spécialité, des ateliers créatifs et une boutique, pensés pour se compléter.</p>
          </div>
          
          <div className="grid-3">
            {experiences.map((exp, index) => (
              <Link to={exp.link} key={index} style={{ textDecoration: 'none', display: 'block' }}>
                <div style={{
                  position: 'relative',
                  height: '420px',
                  borderRadius: '24px',
                  overflow: 'hidden',
                  cursor: 'pointer',
                  backgroundImage: `linear-gradient(rgba(0,0,0,0.1), rgba(0,0,0,0.75)), url(${exp.img})`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                  boxShadow: '0 10px 30px rgba(0,0,0,0.06)',
                  transition: 'transform 0.4s ease, box-shadow 0.4s ease',
                }}
                onMouseOver={(e) => {
                  e.currentTarget.style.transform = 'translateY(-8px)';
                  e.currentTarget.style.boxShadow = '0 20px 40px rgba(88, 96, 76, 0.15)';
                }}
                onMouseOut={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = '0 10px 30px rgba(0,0,0,0.06)';
                }}
                >
                  <div style={{
                    position: 'absolute',
                    bottom: '32px',
                    left: '32px',
                    right: '32px',
                    color: '#fff',
                  }}>
                    <span style={{
                      display: 'inline-block',
                      color: 'var(--primary-beige)',
                      fontWeight: 800,
                      fontSize: '0.8rem',
                      letterSpacing: '2px',
                      marginBottom: '8px'
                    }}>
                      {exp.badge}
                    </span>
                    <h3 style={{ color: '#fff', fontSize: '1.8rem', fontWeight: 800, marginBottom: '16px', lineHeight: '1.2' }}>
                      {exp.title}
                    </h3>
                    <div style={{
                      display: 'inline-block',
                      color: '#fff',
                      fontWeight: 600,
                      fontSize: '0.9rem',
                      borderBottom: '2px solid var(--primary-beige)',
                      paddingBottom: '4px'
                    }}>
                      {exp.action}
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Gallery Section */}
      <section style={{ padding: '100px 0', backgroundColor: 'var(--bg-beige)' }}>
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: '60px' }}>
            <h2 style={{ color: 'var(--primary-green)', fontWeight: 800 }}>Au cœur de Coffee Arts Paris</h2>
            <p style={{ maxWidth: '600px', margin: '0 auto' }}>Des images pour découvrir l'ambiance du lieu, ses matières, et les instants qui s'y vivent au quotidien.</p>
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(2, 1fr)',
            gap: '16px',
          }}>
            {galleryImages.map((imgUrl, idx) => (
              <div key={idx} style={{
                aspectRatio: '3/4',
                borderRadius: '16px',
                overflow: 'hidden',
                boxShadow: '0 4px 15px rgba(0,0,0,0.05)',
                transition: 'transform 0.3s ease',
              }}
              onMouseOver={(e) => e.currentTarget.style.transform = 'scale(1.02)'}
              onMouseOut={(e) => e.currentTarget.style.transform = 'scale(1)'}
              >
                <img src={imgUrl} alt={`Atmosphère ${idx+1}`} style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                }} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Banner Section */}
      <section style={{ padding: '120px 0', position: 'relative', overflow: 'hidden', backgroundColor: 'var(--primary-green)', color: '#fff' }}>
        <div style={{
          position: 'absolute',
          top: '-50%',
          right: '-10%',
          width: '50%',
          height: '150%',
          background: 'radial-gradient(circle, rgba(233, 215, 193, 0.15) 0%, transparent 60%)',
          filter: 'blur(50px)',
        }} />
        <div className="container" style={{ position: 'relative', zIndex: 10, textAlign: 'center' }}>
          <h2 style={{ color: 'var(--primary-beige)', fontSize: '3rem', fontWeight: 800, marginBottom: '24px', lineHeight: '1.2' }}>
            Un moment autour du café <br /> et de la création
          </h2>
          <p style={{ color: 'rgba(255, 255, 255, 0.85)', fontSize: '1.15rem', maxWidth: '600px', margin: '0 auto 40px', fontWeight: 300 }}>
            Un lieu où l'on vient créer, discuter, boire un café et s'attarder. Des moments simples, à vivre et à partager.
          </p>
          <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap', justifyContent: 'center' }}>
            <Link to="/ateliers" className="btn btn-secondary" style={{ padding: '16px 36px' }}>
              Découvrir les ateliers
            </Link>
            <Link to="/boutique" className="btn btn-glass" style={{ padding: '16px 36px' }}>
              Accéder à la boutique
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
