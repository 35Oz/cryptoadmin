# Admin Dashboard

A full-featured MERN stack admin dashboard with authentication, user management, and analytics.

![Admin Dashboard](https://i.postimg.cc/W1tgCYDY/Screenshot-2025-06-11-000610.png)

## Features

- 🔐 User authentication with JWT
- 👥 User management (CRUD operations)
- 📊 Analytics dashboard with charts
- 📱 Responsive design
- 🎨 Modern UI with Tailwind CSS
- 🔒 Role-based access control
- ⚡ Real-time data updates
- 🎯 TypeScript support

## Tech Stack

- **Frontend:**
  - React 18
  - TypeScript
  - Tailwind CSS
  - Recharts
  - Lucide Icons

- **Backend:**
  - Node.js
  - Express
  - MongoDB
  - JWT Authentication

## Getting Started

### Prerequisites

- Node.js 18 or higher
- MongoDB installed locally or a MongoDB Atlas account
- Git

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd admin-dashboard
```

2. Install frontend dependencies:
```bash
npm install
```

3. Install backend dependencies:
```bash
cd server
npm install
```

4. Set up environment variables:

Frontend (.env):
```
VITE_API_URL=http://localhost:5000/api
```

Backend (server/.env):
```
PORT=5000
MONGODB_URI=mongodb://localhost:27017/admin-dashboard
JWT_SECRET=your_jwt_secret_here
JWT_EXPIRES_IN=7d
NODE_ENV=development
```

5. Start the development servers:

In the root directory:
```bash
npm run dev:all
```

This will start both the frontend and backend servers concurrently.

- Frontend: http://localhost:5173
- Backend: http://localhost:5000

## Project Structure

```
├── src/                  # Frontend source files
│   ├── components/       # React components
│   ├── contexts/         # React contexts
│   ├── pages/           # Page components
│   ├── types/           # TypeScript types
│   └── config/          # Configuration files
├── server/              # Backend source files
│   ├── src/
│   │   ├── config/      # Server configuration
│   │   ├── controllers/ # Route controllers
│   │   ├── middlewares/ # Custom middlewares
│   │   ├── models/      # Database models
│   │   └── routes/      # API routes
│   └── package.json     # Backend dependencies
└── package.json         # Frontend dependencies
```

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register a new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/me` - Get current user

### Users
- `GET /api/users` - Get all users (admin only)
- `GET /api/users/:id` - Get user by ID (admin only)
- `POST /api/users` - Create new user (admin only)
- `PUT /api/users/:id` - Update user (admin only)
- `DELETE /api/users/:id` - Delete user (admin only)
- `PUT /api/users/profile` - Update own profile
- `PUT /api/users/password` - Change password

### Dashboard
- `GET /api/dashboard/stats` - Get dashboard statistics (admin only)
- `GET /api/dashboard/user-activity` - Get user activity data (admin only)

## Available Scripts

In the project directory, you can run:

- `npm run dev` - Start frontend development server
- `npm run server` - Start backend development server
- `npm run dev:all` - Start both frontend and backend servers
- `npm run build` - Build frontend for production
- `npm run preview` - Preview production build locally
- `npm run lint` - Run ESLint

## Security Features

- JWT authentication
- Password hashing with bcrypt
- Role-based access control
- Protected API routes
- HTTP-only cookies
- CORS protection
- Input validation
- Error handling

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

