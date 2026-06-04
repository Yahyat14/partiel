import React, { useState } from 'react';

const Carte = () => {
  const [activeTab, setActiveTab] = useState('menu'); // menu, roasting, roasters

  const hotDrinks = [
    { name: 'Espresso', price: '2.50 €', desc: 'Notes de chocolat noir et caramel, corps rond.' },
    { name: 'Double Espresso', price: '3.50 €', desc: 'Riche et intense, extrait sur machine de compétition.' },
    { name: 'Allongé (Americano)', price: '3.50 €', desc: 'Double espresso allongé d’eau chaude filtrée.' },
    { name: 'Cortado', price: '3.80 €', desc: 'Proportions égales d’espresso et de micro-mousse de lait.' },
    { name: 'Cappuccino', price: '4.50 €', desc: 'Espresso avec un équilibre de lait chaud et mousse veloutée.' },
    { name: 'Flat White', price: '4.80 €', desc: 'Double espresso surmonté d’une fine couche de micro-mousse.' },
    { name: 'Café Latte', price: '5.00 €', desc: 'Espresso doux combiné avec du lait chaud émulsionné.' },
    { name: 'Matcha Latte', price: '5.50 €', desc: 'Thé vert matcha japonais Uji bio battu au fouet traditionnel.' },
    { name: 'Chaï Latte', price: '5.50 €', desc: 'Mélange d’épices maison infusé, combiné au lait chaud.' },
  ];

  const coldDrinks = [
    { name: 'Cold Brew', price: '4.50 €', desc: 'Café infusé à froid pendant 16 heures, rafraîchissant.' },
    { name: 'Iced Latte', price: '5.20 €', desc: 'Double espresso versé sur du lait froid et des glaçons.' },
    { name: 'Iced Matcha', price: '5.80 €', desc: 'Matcha mousseux versé sur glace et lait de votre choix.' },
    { name: 'Citronnade Maison', price: '4.50 €', desc: 'Citrons pressés, sucre de canne bio, menthe fraîche.' },
    { name: 'Thé Glacé du Moment', price: '4.50 €', desc: 'Infusion froide de fruits de saison et plantes aromatiques.' },
  ];

  const foodItems = [
    { name: 'Cookie Chocolat Fleur de Sel', price: '3.80 €', desc: 'Cœur coulant, chocolat noir 70% d’origine durable.' },
    { name: 'Banana Bread Grillé', price: '4.50 €', desc: 'Servi chaud avec une noisette de beurre demi-sel d’Isigny.' },
    { name: 'Brownie Noisettes du Piémont', price: '4.20 €', desc: 'Ultra fondant au chocolat et éclats de noisettes torréfiées.' },
    { name: 'Cake Citron & Graines de Pavot', price: '4.00 €', desc: 'Moelleux avec un glaçage acidulé au citron bio.' },
    { name: 'Granola Bowl Maison', price: '7.50 €', desc: 'Yaourt grec ou végétal, fruits frais de saison, miel bio.' },
  ];

  return (
    <div style={{ paddingTop: '80px', backgroundColor: 'var(--bg-beige)', minHeight: '100vh' }}>
      {/* Header Banner */}
      <section style={{ padding: '60px 0 20px', textAlign: 'center' }}>
        <div className="container">
          <h1 style={{ fontWeight: 900, marginBottom: '16px' }}>
            La <span style={{ color: 'var(--accent-cream)' }}>carte</span>
          </h1>
          <p style={{ fontSize: '1.2rem', maxWidth: '600px', margin: '0 auto 40px', fontWeight: 300 }}>
            Une sélection pensée autour du café, du fait-maison <br /> et du plaisir de partager.
          </p>

          {/* Navigation Tab bar */}
          <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '40px' }}>
            <div style={{
              display: 'inline-flex',
              backgroundColor: 'rgba(88, 96, 76, 0.05)',
              backdropFilter: 'blur(8px)',
              borderRadius: '99px',
              padding: '6px',
              border: '1px solid rgba(88, 96, 76, 0.1)',
            }}>
              <button
                onClick={() => setActiveTab('menu')}
                style={{
                  padding: '10px 24px',
                  borderRadius: '99px',
                  border: 'none',
                  fontSize: '0.9rem',
                  fontWeight: 700,
                  cursor: 'pointer',
                  backgroundColor: activeTab === 'menu' ? 'var(--primary-green)' : 'transparent',
                  color: activeTab === 'menu' ? '#fff' : 'var(--primary-green)',
                  transition: 'all 0.3s',
                }}
              >
                La carte
              </button>
              <button
                onClick={() => setActiveTab('roasting')}
                style={{
                  padding: '10px 24px',
                  borderRadius: '99px',
                  border: 'none',
                  fontSize: '0.9rem',
                  fontWeight: 700,
                  cursor: 'pointer',
                  backgroundColor: activeTab === 'roasting' ? 'var(--primary-green)' : 'transparent',
                  color: activeTab === 'roasting' ? '#fff' : 'var(--primary-green)',
                  transition: 'all 0.3s',
                }}
              >
                Torréfaction
              </button>
              <button
                onClick={() => setActiveTab('roasters')}
                style={{
                  padding: '10px 24px',
                  borderRadius: '99px',
                  border: 'none',
                  fontSize: '0.9rem',
                  fontWeight: 700,
                  cursor: 'pointer',
                  backgroundColor: activeTab === 'roasters' ? 'var(--primary-green)' : 'transparent',
                  color: activeTab === 'roasters' ? '#fff' : 'var(--primary-green)',
                  transition: 'all 0.3s',
                }}
              >
                Nos torréfacteurs
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Main content display based on active tab */}
      <section style={{ paddingBottom: '100px' }}>
        <div className="container">
          {activeTab === 'menu' && (
            <div className="animate-fade-in" style={{
              backgroundColor: '#fff',
              borderRadius: '32px',
              padding: '40px',
              boxShadow: '0 10px 30px rgba(0,0,0,0.04)',
              border: '1px solid rgba(88, 96, 76, 0.08)'
            }}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '60px' }}>
                
                {/* Hot Drinks */}
                <div>
                  <h3 style={{ borderBottom: '2px solid var(--primary-beige)', paddingBottom: '12px', marginBottom: '24px', fontWeight: 800 }}>
                    ☕ Boissons Chaudes
                  </h3>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '20px' }}>
                    {hotDrinks.map((item, idx) => (
                      <div key={idx} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', borderBottom: '1px dashed rgba(88, 96, 76, 0.1)', paddingBottom: '12px' }}>
                        <div>
                          <h4 style={{ fontSize: '1.1rem', fontWeight: 700, color: 'var(--primary-green)' }}>{item.name}</h4>
                          <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginTop: '4px' }}>{item.desc}</p>
                        </div>
                        <div style={{ fontWeight: 700, color: 'var(--text-dark)', fontSize: '1.1rem', whiteSpace: 'nowrap' }}>{item.price}</div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Cold Drinks */}
                <div>
                  <h3 style={{ borderBottom: '2px solid var(--primary-beige)', paddingBottom: '12px', marginBottom: '24px', fontWeight: 800 }}>
                    🍹 Boissons Froides
                  </h3>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '20px' }}>
                    {coldDrinks.map((item, idx) => (
                      <div key={idx} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', borderBottom: '1px dashed rgba(88, 96, 76, 0.1)', paddingBottom: '12px' }}>
                        <div>
                          <h4 style={{ fontSize: '1.1rem', fontWeight: 700, color: 'var(--primary-green)' }}>{item.name}</h4>
                          <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginTop: '4px' }}>{item.desc}</p>
                        </div>
                        <div style={{ fontWeight: 700, color: 'var(--text-dark)', fontSize: '1.1rem', whiteSpace: 'nowrap' }}>{item.price}</div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Food items */}
                <div>
                  <h3 style={{ borderBottom: '2px solid var(--primary-beige)', paddingBottom: '12px', marginBottom: '24px', fontWeight: 800 }}>
                    🥐 Douceurs & Pâtisseries (Fait Maison)
                  </h3>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '20px' }}>
                    {foodItems.map((item, idx) => (
                      <div key={idx} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', borderBottom: '1px dashed rgba(88, 96, 76, 0.1)', paddingBottom: '12px' }}>
                        <div>
                          <h4 style={{ fontSize: '1.1rem', fontWeight: 700, color: 'var(--primary-green)' }}>{item.name}</h4>
                          <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginTop: '4px' }}>{item.desc}</p>
                        </div>
                        <div style={{ fontWeight: 700, color: 'var(--text-dark)', fontSize: '1.1rem', whiteSpace: 'nowrap' }}>{item.price}</div>
                      </div>
                    ))}
                  </div>
                </div>

              </div>

              <div style={{ marginTop: '40px', padding: '20px', borderRadius: '16px', backgroundColor: 'var(--bg-beige)', textAlign: 'center', fontSize: '0.9rem', fontWeight: 500, color: 'var(--primary-green)' }}>
                🌾 *Option Lactée : Lait d’avoine bio disponible pour toutes les boissons (+0.50 €)*
              </div>
            </div>
          )}

          {activeTab === 'roasting' && (
            <div className="animate-fade-in" style={{
              backgroundColor: '#fff',
              borderRadius: '32px',
              padding: '48px',
              boxShadow: '0 10px 30px rgba(0,0,0,0.04)',
              maxWidth: '850px',
              margin: '0 auto',
              border: '1px solid rgba(88, 96, 76, 0.08)'
            }}>
              <h3 style={{ fontSize: '2rem', fontWeight: 800, marginBottom: '24px', textAlign: 'center' }}>L'art de la torréfaction douce</h3>
              <p style={{ marginBottom: '20px', fontSize: '1.05rem', lineHeight: '1.8' }}>
                La torréfaction est une étape cruciale qui transforme la fève verte et dure du caféier en un grain brun et croustillant rempli d'arômes complexes. À Coffee Arts Paris, nous privilégions la <strong>torréfaction claire à moyenne</strong> (aussi appelée "blonde" ou "robe de moine").
              </p>
              <p style={{ marginBottom: '20px', fontSize: '1.05rem', lineHeight: '1.8' }}>
                Contrairement à la torréfaction poussée industrielle qui uniformise les goûts en brûlant les sucres naturels, la torréfaction douce préserve les caractéristiques spécifiques du terroir d'origine du café. On retrouve ainsi des notes d'agrumes, de jasmin, de pêche, de baies ou de sucre roux qui sont naturellement présentes dans le grain vert.
              </p>
              <p style={{ marginBottom: '20px', fontSize: '1.05rem', lineHeight: '1.8' }}>
                Chaque lot est cuit de manière artisanale, en surveillant précisément la courbe de température pour ajuster le moment clé du <em>"first crack"</em> (lorsque le grain libère sa vapeur et gonfle). C'est ce travail de précision qui confère à notre café une sucrosité naturelle et une acidité vibrante et équilibrée.
              </p>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '20px', marginTop: '40px' }}>
                <div style={{ textAlign: 'center', padding: '20px', borderRadius: '16px', backgroundColor: 'var(--bg-beige)' }}>
                  <span style={{ fontSize: '2rem' }}>🌱</span>
                  <h4 style={{ margin: '12px 0 6px', fontWeight: 700 }}>Terroir préservé</h4>
                  <p style={{ fontSize: '0.85rem' }}>Chaque tasse exprime les saveurs naturelles de son sol d'origine.</p>
                </div>
                <div style={{ textAlign: 'center', padding: '20px', borderRadius: '16px', backgroundColor: 'var(--bg-beige)' }}>
                  <span style={{ fontSize: '2rem' }}>⏱️</span>
                  <h4 style={{ margin: '12px 0 6px', fontWeight: 700 }}>Torréfaction lente</h4>
                  <p style={{ fontSize: '0.85rem' }}>Une cuisson douce à basse température pour préserver le grain.</p>
                </div>
                <div style={{ textAlign: 'center', padding: '20px', borderRadius: '16px', backgroundColor: 'var(--bg-beige)' }}>
                  <span style={{ fontSize: '2rem' }}>📈</span>
                  <h4 style={{ margin: '12px 0 6px', fontWeight: 700 }}>Qualité constante</h4>
                  <p style={{ fontSize: '0.85rem' }}>Courbes de torréfaction analysées et contrôlées par lot.</p>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'roasters' && (
            <div className="animate-fade-in" style={{
              backgroundColor: '#fff',
              borderRadius: '32px',
              padding: '48px',
              boxShadow: '0 10px 30px rgba(0,0,0,0.04)',
              maxWidth: '850px',
              margin: '0 auto',
              border: '1px solid rgba(88, 96, 76, 0.08)'
            }}>
              <h3 style={{ fontSize: '2rem', fontWeight: 800, marginBottom: '24px', textAlign: 'center' }}>Nos ateliers de torréfaction partenaires</h3>
              <p style={{ marginBottom: '24px', fontSize: '1.05rem', lineHeight: '1.8', textAlign: 'center' }}>
                Le café est un produit agricole de saison. C'est pourquoi nous collaborons de manière tournante avec les meilleurs torréfacteurs artisanaux de France et d'Europe pour vous proposer continuellement de nouvelles découvertes.
              </p>
              
              <div style={{ display: 'flex', flexDirection: 'column', gap: '30px', marginTop: '30px' }}>
                <div style={{ display: 'flex', gap: '20px', alignItems: 'center', borderBottom: '1px solid var(--border-light)', paddingBottom: '24px' }}>
                  <div style={{ width: '80px', height: '80px', borderRadius: '50%', backgroundColor: 'var(--primary-green)', color: '#fff', display: 'flex', alignItems: 'center', justifyCenter: 'center', fontSize: '1.5rem', fontWeight: 800, flexShrink: 0, justifyContent: 'center' }}>K</div>
                  <div>
                    <h4 style={{ fontSize: '1.2rem', fontWeight: 800 }}>Kawa Torréfaction (Paris, France)</h4>
                    <p style={{ fontSize: '0.9rem', marginTop: '4px' }}>Reconnus pour leurs cafés d'exception et leurs procédés expérimentaux de fermentation anaérobie. Kawa nous fournit des profils aromatiques surprenants aux notes fruitées éclatantes.</p>
                  </div>
                </div>

                <div style={{ display: 'flex', gap: '20px', alignItems: 'center', borderBottom: '1px solid var(--border-light)', paddingBottom: '24px' }}>
                  <div style={{ width: '80px', height: '80px', borderRadius: '50%', backgroundColor: 'var(--accent-green)', color: '#fff', display: 'flex', alignItems: 'center', justifyCenter: 'center', fontSize: '1.5rem', fontWeight: 800, flexShrink: 0, justifyContent: 'center' }}>B</div>
                  <div>
                    <h4 style={{ fontSize: '1.2rem', fontWeight: 800 }}>Belleville Brûlerie (Paris, France)</h4>
                    <p style={{ fontSize: '0.9rem', marginTop: '4px' }}>Les pionniers du café de spécialité à Paris. Belleville élabore des assemblages et des monos-origines parfaits pour des espressos équilibrés, gourmands et intemporels.</p>
                  </div>
                </div>

                <div style={{ display: 'flex', gap: '20px', alignItems: 'center', paddingBottom: '12px' }}>
                  <div style={{ width: '80px', height: '80px', borderRadius: '50%', backgroundColor: 'var(--accent-cream)', color: '#fff', display: 'flex', alignItems: 'center', justifyCenter: 'center', fontSize: '1.5rem', fontWeight: 800, flexShrink: 0, justifyContent: 'center' }}>C</div>
                  <div>
                    <h4 style={{ fontSize: '1.2rem', fontWeight: 800 }}>Coutume Café (Paris, France)</h4>
                    <p style={{ fontSize: '0.9rem', marginTop: '4px' }}>Une approche scientifique de la torréfaction et du sourcing. Coutume met en valeur des terroirs rares et des micro-lots uniques en commerce direct avec les fermiers.</p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default Carte;
