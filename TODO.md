# TODO - Coffee Arts Paris (Full Stack)

## Backend
- [x] Mettre à jour la connexion MongoDB Mongoose v9 (suppression useNewUrlParser/useUnifiedTopology)
- [x] Brancher les routes “stubs” sur controllers existants
- [x] Ajouter protection JWT/admin sur les endpoints admin
- [ ] Vérifier les endpoints /api/* avec Postman/curl (products, workshops, orders, reservations, blog, contact, users)

## Frontend
- [ ] Remplacer le template Vite App.jsx par une UI proche de https://www.coffeeartsparis.fr/
- [ ] Ajouter React Router (pages : Accueil, Produits, Ateliers, Blog, Auth, Espace client, Admin)
- [ ] Mettre en place une couche API (axios) reliée à BACKEND_URL
- [ ] Ajouter components : Header/Footer, Cards, Forms, Pagination
- [ ] Relier les actions admin (CRUD produits/ateliers/blog/users/contact)

## Déploiement (Vercel)
- [ ] Préparer backend pour Vercel (serverless / ou adapter à un Vercel Node function)
- [ ] Préparer frontend Vercel (build + env VITE_BACKEND_URL)
- [ ] Variables d’environnement : MongoDB Atlas, JWT_SECRET, CORS origin
- [ ] Checklist de build & smoke tests

