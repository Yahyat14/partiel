const bcryptjs = require('bcryptjs');
const Product = require('../models/Product');
const Workshop = require('../models/Workshop');
const Blog = require('../models/Blog');
const User = require('../models/User');

const seedData = async () => {
  try {
    console.log('Checking database content for seeding...');

    // 1. Seed Admin User if not exists
    let admin = await User.findOne({ role: 'admin' });
    if (!admin) {
      console.log('Seeding default Admin user...');
      const salt = await bcryptjs.genSalt(10);
      const hashedPassword = await bcryptjs.hash('adminpassword', salt);
      
      admin = await User.create({
        firstName: 'Coffee',
        lastName: 'Admin',
        email: 'admin@coffeeartsparis.fr',
        password: hashedPassword,
        role: 'admin',
        phone: '07.66.91.82.94',
        address: '25 Boulevard du Temple',
        city: 'Paris',
        postalCode: '75003'
      });
      console.log('Admin user seeded: admin@coffeeartsparis.fr / adminpassword');
    }

    // 2. Seed Products
    const productCount = await Product.countDocuments();
    if (productCount === 0) {
      console.log('Seeding products...');
      const products = [
        {
          name: 'Tasse Espresso Grès',
          description: 'Petite tasse en grès blanc, émaillée à la main dans notre atelier de Paris. Idéale pour vos espressos serrés. Résiste au lave-vaisselle et micro-ondes.',
          price: 18,
          category: 'ceramic',
          image: 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?q=80&w=600&auto=format&fit=crop',
          quantity: 24,
          sku: 'CER-ESP-01'
        },
        {
          name: 'Mug Céramique Rustique',
          description: 'Grand mug avec une anse confortable et un aspect brut texturé. Parfait pour vos cafés allongés, cappuccinos ou thés quotidiens.',
          price: 24,
          category: 'ceramic',
          image: 'https://images.unsplash.com/photo-1577937927133-66ef06acdf18?q=80&w=600&auto=format&fit=crop',
          quantity: 15,
          sku: 'CER-MUG-02'
        },
        {
          name: 'Bol Matcha Artisanal',
          description: 'Bol de cérémonie (Chawan) façonné au tour. Sa large base permet un fouettage idéal de la poudre de thé Matcha.',
          price: 32,
          category: 'ceramic',
          image: 'https://images.unsplash.com/photo-1576092768241-dec231879fc3?q=80&w=600&auto=format&fit=crop',
          quantity: 10,
          sku: 'CER-MAT-03'
        },
        {
          name: 'Café Éthiopie - Yirgacheffe (250g)',
          description: 'Café de spécialité aux notes florales de jasmin et d’agrumes. Torréfaction claire idéale en filtre (V60, Chemex). 100% Arabica, récolte manuelle.',
          price: 14.50,
          category: 'coffee',
          image: 'https://images.unsplash.com/photo-1447933601403-0c6688de566e?q=80&w=600&auto=format&fit=crop',
          quantity: 50,
          sku: 'COF-ETH-01'
        },
        {
          name: 'Café Colombie - El Paraiso (250g)',
          description: 'Un profil aromatique surprenant avec des notes intenses de fruits rouges et de pêche. Torréfaction moyenne, excellent en filtre comme en espresso.',
          price: 16.00,
          category: 'coffee',
          image: 'https://images.unsplash.com/photo-1559056199-641a0ac8b55e?q=80&w=600&auto=format&fit=crop',
          quantity: 40,
          sku: 'COF-COL-02'
        },
        {
          name: 'Café Brésil - Caramelo (250g)',
          description: 'Un café gourmand et rond, aux notes riches de chocolat au lait, caramel et noisette grillée. Torréfaction foncée idéale pour espresso crémeux.',
          price: 12.00,
          category: 'coffee',
          image: 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?q=80&w=600&auto=format&fit=crop',
          quantity: 45,
          sku: 'COF-BRA-03'
        },
        {
          name: 'Tote Bag "Coffee Arts" Coton',
          description: 'Tote bag en coton biologique épais de 340g. Graphisme exclusif sérigraphié représentant nos deux passions : le café et le tour de potier.',
          price: 15.00,
          category: 'accessories',
          image: 'https://images.unsplash.com/photo-1544816155-12df9643f363?q=80&w=600&auto=format&fit=crop',
          quantity: 100,
          sku: 'ACC-TOT-01'
        },
        {
          name: 'Casquette Brodée Sauge',
          description: 'Casquette unisexe 100% coton bio délavé, couleur vert sauge avec le logo "Coffee Arts Paris" discrètement brodé à l’avant.',
          price: 25.00,
          category: 'accessories',
          image: 'https://images.unsplash.com/photo-1588850561407-ed78c282e89b?q=80&w=600&auto=format&fit=crop',
          quantity: 30,
          sku: 'ACC-CAS-02'
        }
      ];

      await Product.insertMany(products);
      console.log('Products successfully seeded!');
    }

    // 3. Seed Workshops
    const workshopCount = await Workshop.countDocuments();
    if (workshopCount === 0) {
      console.log('Seeding workshops...');
      
      const nextWeekDate = (daysToAdd) => {
        const d = new Date();
        d.setDate(d.getDate() + daysToAdd);
        d.setHours(14, 0, 0, 0);
        return d;
      };

      const workshops = [
        {
          title: 'Peinture sur Céramique - Créez votre mug',
          description: 'Découvrez la peinture sur céramique. Choisissez un mug ou une assiette pré-cuite (biscuit) et laissez libre cours à votre créativité avec nos engobes et pinceaux. Nous nous occupons ensuite de l’émaillage transparent et de la cuisson finale à 1020°C.',
          category: 'ceramic',
          instructor: 'Jennifer Burk',
          date: nextWeekDate(3),
          time: '14:00',
          duration: 2,
          capacity: 8,
          price: 49.00,
          level: 'beginner',
          materials: ['Biscuit céramique', 'Pinceaux', 'Engobes de couleurs', 'Émaillage & cuisson inclus'],
          maxParticipants: 8,
          image: 'https://images.unsplash.com/photo-1565192647048-f997ded87958?q=80&w=600&auto=format&fit=crop'
        },
        {
          title: 'Modelage Argile - Façonnage de vaisselle rustique',
          description: 'Apprenez les techniques de base du modelage (pincé, plaque, colombin) pour façonner votre propre ensemble de petit-déjeuner. Une expérience tactile et relaxante guidée pas à pas.',
          category: 'ceramic',
          instructor: 'Jennifer Burk',
          date: nextWeekDate(5),
          time: '10:00',
          duration: 3,
          capacity: 6,
          price: 65.00,
          level: 'beginner',
          materials: ['Argile grès naturel', 'Outils de modelage', 'Estèques', 'Cuisson & émaillage inclus'],
          maxParticipants: 6,
          image: 'https://images.unsplash.com/photo-1595225476474-87563907a212?q=80&w=600&auto=format&fit=crop'
        },
        {
          title: 'Initiation Barista & Dégustation de Cafés',
          description: 'Entrez dans le monde du café de spécialité. Comprenez l’importance du terroir, du traitement et de la torréfaction. Apprenez ensuite les bases d’une extraction parfaite en méthode douce V60 et espresso.',
          category: 'barista',
          instructor: 'Marc Dubois',
          date: nextWeekDate(7),
          time: '16:00',
          duration: 2,
          capacity: 5,
          price: 45.00,
          level: 'beginner',
          materials: ['Différentes origines de café', 'Fiches de dégustation', 'Accès aux machines espresso et V60'],
          maxParticipants: 5,
          image: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?q=80&w=600&auto=format&fit=crop'
        },
        {
          title: 'Masterclass Latte Art - Dessiner sur le café',
          description: 'Maîtrisez la préparation de la micro-mousse de lait et apprenez à verser les motifs classiques : le cœur, la rosette et la tulipe. Pré-requis : avoir déjà des notions de base sur l’espresso.',
          category: 'latte-art',
          instructor: 'Marc Dubois',
          date: nextWeekDate(10),
          time: '15:00',
          duration: 2.5,
          capacity: 4,
          price: 55.00,
          level: 'intermediate',
          materials: ['Lait bio & boissons végétales', 'Pichets de compétition', 'Café à volonté pour pratiquer'],
          maxParticipants: 4,
          image: 'https://images.unsplash.com/photo-1534778101976-62847782c213?q=80&w=600&auto=format&fit=crop'
        }
      ];

      await Workshop.insertMany(workshops);
      console.log('Workshops successfully seeded!');
    }

    // 4. Seed Blog Posts
    const blogCount = await Blog.countDocuments();
    if (blogCount === 0) {
      console.log('Seeding blog posts...');
      const posts = [
        {
          title: 'L’art du café céramique : Pourquoi ce mariage ?',
          slug: 'l-art-du-cafe-ceramique',
          content: 'Qu’y a-t-il de commun entre le geste précis du barista dessinant une rosette de lait sur un cappuccino, et le mouvement hypnotique du potier façonnant l’argile sur son tour ? Bien plus qu’on ne le pense. À Coffee Arts Paris, nous pensons que ces deux disciplines partagent la même philosophie : le respect du temps, de la matière, et de l’artisanat fait main. Boire son café du matin dans un mug que l’on a façonné ou peint soi-même modifie notre rapport aux objets du quotidien. C’est un retour à la lenteur et au plaisir simple de l’instant.',
          author: admin._id,
          authorName: 'L’équipe Coffee Arts',
          category: 'coffee',
          image: 'https://images.unsplash.com/photo-1517256064527-09c53b2d0bc6?q=80&w=600&auto=format&fit=crop'
        },
        {
          title: 'Dégustation : Qu’est-ce qu’un café de spécialité ?',
          slug: 'degustation-cafe-de-specialite',
          content: 'Le café de spécialité n’a rien à voir avec le café industriel auquel nous sommes habitués. C’est un café d’excellence, noté au minimum 80/100 par la Specialty Coffee Association (SCA). Derrière ce titre se cachent une traçabilité totale (on connaît le producteur, la variété botanique, l’altitude de pousse, la méthode de traitement), une cueillette exclusivement manuelle des cerises arrivées à parfaite maturité, et une torréfaction artisanale respectueuse des arômes naturels de la fève. Ne soyez pas repris de découvrir des notes de jasmin, de pêche ou de chocolat dans votre tasse : aucun arôme n’est ajouté, c’est simplement l’expression pure du terroir !',
          author: admin._id,
          authorName: 'Marc Dubois',
          category: 'coffee',
          image: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?q=80&w=600&auto=format&fit=crop'
        },
        {
          title: '5 conseils pour entretenir vos pièces en grès émaillé',
          slug: 'cinq-conseils-gres-emaille',
          content: 'Toutes les créations réalisées ou achetées dans notre atelier sont fabriquées en grès haute température, ce qui leur confère une solidité exceptionnelle. Cependant, pour préserver la beauté de vos émaux artisanaux pendant des décennies, voici nos conseils de soins :\n\n1. Évitez les chocs thermiques trop violents (ne versez pas d’eau bouillante directement dans un mug glacé).\n2. Même si nos pièces passent au lave-vaisselle, un lavage doux à la main préservera la brillance de l’émail plus longtemps.\n3. N’utilisez pas d’éponges métalliques ou abrasives.\n4. Nos pièces passent au micro-ondes, mais évitez de les y laisser de trop longues minutes.\n5. Chérissez chaque irrégularité : c’est le témoignage unique du travail de la main.',
          author: admin._id,
          authorName: 'Jennifer Burk',
          category: 'tips',
          image: 'https://images.unsplash.com/photo-1565192647048-f997ded87958?q=80&w=600&auto=format&fit=crop'
        }
      ];

      await Blog.insertMany(posts);
      console.log('Blog posts successfully seeded!');
    }

    console.log('Seeding process complete!');
  } catch (error) {
    console.error('Error seeding database:', error.message);
  }
};

module.exports = seedData;
