# Food Delivery Application

A full-stack food delivery application with user authentication, cart management, and order processing.

## Features

- User authentication (register, login)
- Food item browsing and searching
- Cart management (add, remove, view)
- Order processing
- Responsive design for mobile and desktop

## Tech Stack

### Backend
- Node.js
- Express.js
- MongoDB with Mongoose
- JWT for authentication
- Multer for file uploads

### Frontend
- React
- React Router for navigation
- Axios for API requests
- Vite for build tooling

## Project Structure

```
food_del/
├── backend/              # Backend server code
│   ├── config/           # Configuration files
│   ├── controllers/      # Route controllers
│   ├── middleware/       # Custom middleware
│   ├── models/           # Database models
│   ├── routes/           # API routes
│   ├── uploads/          # Uploaded files
│   ├── .env              # Environment variables
│   ├── package.json      # Backend dependencies
│   └── server.js         # Entry point
│
├── frontend/             # Frontend React application
│   ├── public/           # Static files
│   ├── src/              # Source code
│   ├── package.json      # Frontend dependencies
│   └── vite.config.js    # Vite configuration
│
└── DEPLOYMENT_GUIDE.md   # Deployment instructions
```

## Getting Started

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn
- MongoDB (local or Atlas)

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/food_del.git
   cd food_del
   ```

2. Install backend dependencies:
   ```bash
   cd backend
   npm install
   ```

3. Install frontend dependencies:
   ```bash
   cd ../frontend
   npm install
   ```

4. Set up environment variables:
   - Create a `.env` file in the backend directory with the following variables:
     ```
     PORT=4000
     MONGODB_URI=your_mongodb_connection_string
     JWT_SECRET=your_jwt_secret
     NODE_ENV=development
     ```

5. Start the backend server:
   ```bash
   cd backend
   npm run dev
   ```

6. Start the frontend development server:
   ```bash
   cd frontend
   npm run dev
   ```

7. Open your browser and navigate to `http://localhost:5173`

## Deployment

For detailed deployment instructions, see [DEPLOYMENT_GUIDE.md](DEPLOYMENT_GUIDE.md).

## License

This project is licensed under the ISC License.

## Acknowledgments

- MongoDB Atlas for database hosting
- Render/Vercel/Netlify for deployment options 
