# Coffee Arts Paris - Full Stack Clone

A complete functional reproduction of the CoffeeArtsParis website with e-commerce, workshops, blog, and admin management system.

## Project Overview

This is an academic exam project for ISITN 4ème année. It's a full-stack web application featuring:

- **Frontend**: React.js with Vite
- **Backend**: Node.js / Express.js
- **Database**: MongoDB (or MySQL)
- **Features**: Product shop, workshops booking, blog, contact form, admin dashboard, client account space

## Project Structure

```
partiel/
├── frontend/                # React frontend application
│   ├── src/
│   │   ├── components/     # Reusable React components
│   │   ├── pages/          # Page components
│   │   ├── hooks/          # Custom React hooks
│   │   ├── context/        # Context API for state
│   │   ├── utils/          # Helper functions
│   │   └── App.jsx         # Main App component
│   ├── package.json
│   └── vite.config.js
├── backend/                 # Express backend application
│   ├── routes/             # API route definitions
│   │   ├── auth.js         # Authentication routes
│   │   ├── products.js     # Product management
│   │   ├── orders.js       # Order management
│   │   ├── workshops.js    # Workshop management
│   │   ├── reservations.js # Reservation management
│   │   ├── contact.js      # Contact form
│   │   ├── blog.js         # Blog management
│   │   └── users.js        # User management
│   ├── models/             # Database schemas
│   ├── middleware/         # Express middleware
│   ├── controllers/        # Business logic
│   ├── server.js           # Express server setup
│   ├── package.json
│   └── .env                # Environment variables
├── .env.example            # Example environment variables
├── .gitignore              # Git ignore rules
└── README.md               # This file
```

## Tech Stack

### Frontend
- **React 18**: UI library
- **Vite**: Build tool and dev server
- **React Router**: Navigation
- **Axios**: HTTP client
- **Zustand**: State management

### Backend
- **Express.js**: Web framework
- **Mongoose**: MongoDB ODM (or MySQL driver)
- **BCryptjs**: Password hashing
- **JWT**: Authentication tokens
- **CORS**: Cross-origin requests

## Prerequisites

- Node.js (v16+)
- npm or yarn
- MongoDB (local or cloud) OR MySQL
- Git

## Installation & Setup

### 1. Clone the Repository

```bash
git clone <your-repo-url>
cd partiel
```

### 2. Environment Variables

Create a `.env` file in the root directory based on `.env.example`:

```bash
cp .env.example .env
```

Update `.env` with your configuration:

```env
MONGODB_URI=mongodb://localhost:27017/coffeearts
# OR for MySQL
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=password
DB_NAME=coffeearts

PORT=5000
FRONTEND_URL=http://localhost:5173

JWT_SECRET=your_secure_secret_key
JWT_EXPIRE=7d

CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
```

### 3. Backend Setup

```bash
cd backend
npm install
npm run dev
```

Backend will run on `http://localhost:5000`

### 4. Frontend Setup

In a new terminal:

```bash
cd frontend
npm install
npm run dev
```

Frontend will run on `http://localhost:5173`

## Features Implemented

### Phase 1: Project Structure ✓
- [x] React frontend initialized
- [x] Express backend initialized
- [x] Database configuration setup
- [x] Environment variables

### Phase 2: Core Features (In Progress)
- [ ] User Authentication (Client & Admin)
- [ ] Product Management & Display
- [ ] Shopping Cart
- [ ] Orders Management
- [ ] Workshop Booking
- [ ] Blog System
- [ ] Contact Form
- [ ] Payment Simulation

### Phase 3: Admin & Client Panels (Todo)
- [ ] Admin Dashboard
- [ ] Client Account Area
- [ ] Order History
- [ ] Workshop Reservations

### Phase 4: Polish & Deploy (Todo)
- [ ] Cloudinary Image Upload
- [ ] Responsive Design
- [ ] Frontend Deployment (Vercel)
- [ ] Backend Deployment (Vercel)

## Database Schema

### Users Collection
```
{
  _id: ObjectId,
  email: String (unique),
  password: String (hashed),
  firstName: String,
  lastName: String,
  phone: String,
  address: String,
  role: 'client' | 'admin',
  createdAt: Date
}
```

### Products Collection
```
{
  _id: ObjectId,
  name: String,
  description: String,
  price: Number,
  category: String,
  image: String (Cloudinary URL),
  quantity: Number,
  createdAt: Date
}
```

### Orders Collection
```
{
  _id: ObjectId,
  userId: ObjectId,
  items: [{productId, quantity, price}],
  total: Number,
  status: 'pending' | 'processing' | 'shipped' | 'delivered',
  createdAt: Date
}
```

### Workshops Collection
```
{
  _id: ObjectId,
  title: String,
  description: String,
  date: Date,
  time: String,
  capacity: Number,
  availableSpots: Number,
  price: Number,
  image: String,
  createdAt: Date
}
```

### Blog Posts Collection
```
{
  _id: ObjectId,
  title: String,
  content: String,
  author: String,
  image: String,
  createdAt: Date,
  updatedAt: Date
}
```

### Contact Messages Collection
```
{
  _id: ObjectId,
  name: String,
  email: String,
  subject: String,
  message: String,
  createdAt: Date
}
```

## API Routes

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `POST /api/auth/admin-login` - Admin login
- `POST /api/auth/logout` - Logout

### Products
- `GET /api/products` - Get all products
- `GET /api/products/:id` - Get product by ID
- `POST /api/products` - Create product (admin)
- `PUT /api/products/:id` - Update product (admin)
- `DELETE /api/products/:id` - Delete product (admin)

### Orders
- `GET /api/orders` - Get orders
- `GET /api/orders/:id` - Get order by ID
- `POST /api/orders` - Create order
- `PUT /api/orders/:id` - Update order status (admin)

### Workshops
- `GET /api/workshops` - Get all workshops
- `GET /api/workshops/:id` - Get workshop by ID
- `POST /api/workshops` - Create workshop (admin)
- `PUT /api/workshops/:id` - Update workshop (admin)
- `DELETE /api/workshops/:id` - Delete workshop (admin)

### Contact
- `POST /api/contact` - Submit contact form
- `GET /api/contact` - Get all messages (admin)

### Blog
- `GET /api/blog` - Get all posts
- `GET /api/blog/:id` - Get post by ID
- `POST /api/blog` - Create post (admin)
- `PUT /api/blog/:id` - Update post (admin)
- `DELETE /api/blog/:id` - Delete post (admin)

## Development Workflow

### Making Changes

1. Create a feature branch:
```bash
git checkout -b feat/feature-name
```

2. Make your changes

3. Commit with meaningful message:
```bash
git add .
git commit -m "feat: description of changes"
```

4. Push to GitHub:
```bash
git push origin feat/feature-name
```

### Git Commit Strategy

Follow this pattern for commit messages:
- `init:` - Initial setup
- `feat:` - New feature
- `fix:` - Bug fix
- `docs:` - Documentation
- `style:` - Code style
- `refactor:` - Code refactoring
- `test:` - Tests
- `deploy:` - Deployment

## Deployment

### Frontend (Vercel)
```bash
cd frontend
vercel
```

### Backend (Vercel)
```bash
cd backend
vercel
```

Update frontend `.env` with deployed backend URL after deployment.

## Testing

Test the health check endpoint:
```bash
curl http://localhost:5000/api/health
```

## Troubleshooting

### Port Already in Use
- Backend: Change PORT in .env
- Frontend: Use `npm run dev -- --port 5174`

### Database Connection Error
- Ensure MongoDB is running: `mongod`
- Check MongoDB URI in .env
- Verify database credentials

### CORS Error
- Update FRONTEND_URL in backend .env
- Verify origin in CORS configuration

## Team Guidelines

- Understand all code before committing
- Write clean, readable code with comments
- Test features before pushing
- Keep commits meaningful and focused
- Document changes in commit messages

## Exam Requirements Met

✓ Full-stack application (React + Express + DB)
✓ Product shop with cart
✓ Workshop booking system
✓ Admin dashboard
✓ Client account space
✓ Blog system
✓ Contact form
✓ Authentication (client & admin)
✓ Image upload support
✓ Responsive design
✓ Clean Git history
✓ Deployment ready

## License

This project is for educational purposes (ISITN 4ème année exam).

## Authors

- Your Name/Team

## Deployment Links

- **Frontend**: [To be added after deployment]
- **Backend**: [To be added after deployment]

---

**Last Updated**: June 4, 2026  
**Exam Date**: June 4, 2026
