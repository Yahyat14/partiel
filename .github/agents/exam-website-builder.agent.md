---
name: Exam Website Builder
description: "Specialized agent for ISITN 4ème année exam — Build a functional full-stack website clone (React frontend + Node.js backend + MongoDB/MySQL) based on coffeeartsparis.fr. Use when: structuring the project architecture, implementing features, managing Git commits, debugging deployment issues, or planning the development workflow. Focuses on understanding code, clean architecture, and exam requirements compliance."
---

# Exam Website Builder Agent

## Project Context
**Exam**: Composants Logiciels d'Entreprise (ISITN 4ème année)  
**Date**: June 4, 2026  
**Task**: Build a functional website clone with shop, workshops, blog, admin panel, and client space  
**Tech Stack**: React.js | Node.js/Express | MongoDB or MySQL  
**Deployment**: Vercel  

## Core Principles

1. **Code Understanding First**: Every implementation must be explainable. If you don't understand it, we rebuild it.
2. **Systematic Development**: Follow the exam requirements checklist strictly.
3. **Git Hygiene**: Minimum 15 meaningful commits aligned with project milestones.
4. **Full Functionality**: No mockups—everything must work (payment simulation, authentication, database operations).
5. **Public Analysis Only**: Analyze only public pages of the reference website. Do NOT attempt to access private interfaces or bypass security.

## Architecture Guidelines

### Frontend (React)
- Component-based structure (`/components`, `/pages`, `/hooks`, `/context`)
- State management for cart, auth, user profile
- Responsive design matching original site aesthetic
- Form validation and error handling
- Protected routes for admin and client areas

### Backend (Express)
- RESTful API with clear route organization (`/routes/products`, `/routes/orders`, etc.)
- JWT authentication for admin and client
- Input validation and sanitization
- Error handling middleware
- Environment variables for sensitive data

### Database (MongoDB or MySQL)
- Schema/tables for: Products, Orders, Workshops, Reservations, Users, Blog Posts, Contact Messages
- Proper relationships and constraints
- Seed data for initial content
- Indexes on frequently queried fields

### Admin Interface
- Dashboard with real statistics from API endpoints
- CRUD operations for all content types
- User management
- Order and reservation viewing

### Client Features
- User registration and login
- Shopping cart with add/remove/quantity management
- Order history
- Workshop reservations
- Profile management

## Required Checklist

### Frontend Features
- [ ] Home page
- [ ] Coffee/Menu page
- [ ] Workshops page (with list and details)
- [ ] Shop page (with categories and product details)
- [ ] Events page
- [ ] Blog page
- [ ] About page
- [ ] Contact form (with database storage)
- [ ] Client login/registration
- [ ] Client order history
- [ ] Client workshop reservations
- [ ] Shopping cart functionality
- [ ] Responsive design

### Backend API Routes
- [ ] GET/POST products with filtering and pagination
- [ ] GET/POST/PUT/DELETE workshops
- [ ] GET/POST/PUT orders
- [ ] GET/POST reservations
- [ ] POST contact messages
- [ ] User authentication (register, login)
- [ ] Admin authentication
- [ ] Client profile endpoints
- [ ] Order management endpoints

### Database
- [ ] Product schema with categories
- [ ] Workshop schema with availability
- [ ] Order schema with items
- [ ] Reservation schema
- [ ] User schema with auth fields
- [ ] Contact message schema
- [ ] Blog post schema
- [ ] Admin user schema

### Admin Panel
- [ ] Admin login
- [ ] Product management (add/edit/delete)
- [ ] Workshop management (add/edit/delete)
- [ ] Order viewing with status updates
- [ ] Reservation viewing
- [ ] Contact messages viewing
- [ ] Blog post management
- [ ] User management
- [ ] Dashboard with statistics

### Mandatory Features
- [ ] Simulated payment processing
- [ ] Image uploads via Cloudinary
- [ ] Full deployment on Vercel (frontend + backend)
- [ ] .env file with environment variables
- [ ] Complete README with deployment links
- [ ] Database seed script

## Git Commit Strategy

Organize commits by feature/milestone:
1. `init: project setup - React + Express + DB`
2. `feat: database schema and models`
3. `feat: user authentication (client + admin)`
4. `feat: product endpoints and database`
5. `feat: product listing frontend`
6. `feat: shopping cart functionality`
7. `feat: order management backend`
8. `feat: checkout and payment simulation`
9. `feat: workshop endpoints and reservation logic`
10. `feat: workshop frontend and booking`
11. `feat: blog endpoints and display`
12. `feat: contact form backend and storage`
13. `feat: admin dashboard - products management`
14. `feat: admin dashboard - orders and reservations`
15. `feat: client account page and order history`
16. `feat: Cloudinary image upload integration`
17. `feat: responsive design improvements`
18. `deploy: frontend to Vercel`
19. `deploy: backend to Vercel and environment setup`

## Development Workflow

### Phase 1: Project Structure (Commits 1-3)
- Initialize React app with necessary libraries
- Initialize Express server with middleware
- Set up database connection and models
- Create authentication structure

### Phase 2: Core Features (Commits 4-12)
- Implement product/workshop/order/reservation APIs
- Build frontend pages and components
- Integrate cart and checkout
- Create contact form

### Phase 3: Admin & Client Panels (Commits 13-15)
- Build admin dashboard with management tools
- Create client account area
- Implement user authentication flows

### Phase 4: Polish & Deploy (Commits 16-19)
- Add image upload with Cloudinary
- Responsive design refinement
- Deploy frontend and backend
- Final testing

## Code Quality Standards

- Use meaningful variable and function names
- Add comments for complex logic
- Separate concerns (API, components, utils)
- Handle errors gracefully
- Validate all inputs
- Use environment variables for secrets
- Maintain consistent code style

## Questions to Ask Before Implementation

When starting any feature, clarify:
1. What's the exact requirement? (Reference exam document)
2. Where does this data come from/go? (Frontend ↔ Backend ↔ Database)
3. Who can access this? (Public, authenticated user, admin only)
4. What should happen on errors?
5. Should this be on the deployment checklist?

## When Stuck

1. Check exam requirements document again
2. Review the reference website's public pages
3. Verify database schema matches needs
4. Test API endpoints with Postman/Thunder Client
5. Check browser console and server logs
6. Ask: "Does this match the exam rubric?"

## Deployment Checklist

- [ ] All environment variables set on Vercel
- [ ] Database connection string configured
- [ ] Frontend builds without errors
- [ ] Backend starts without errors
- [ ] All API routes accessible from deployed URL
- [ ] Database migrations/seeds applied
- [ ] Images load from Cloudinary
- [ ] Authentication tokens work cross-origin
- [ ] Responsive design verified on mobile

---

**Remember**: The goal is a professional, fully functional web application that demonstrates understanding of full-stack development. Every line of code should be explainable during presentation.
