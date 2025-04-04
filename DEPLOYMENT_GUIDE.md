# Deployment Guide for Food Delivery Application

This guide will help you deploy both the frontend and backend of your food delivery application.

## Table of Contents
1. [Prerequisites](#prerequisites)
2. [Deploying the Backend](#deploying-the-backend)
3. [Deploying the Frontend](#deploying-the-frontend)
4. [Deploying to Render](#deploying-to-render)
5. [Deploying to Vercel](#deploying-to-vercel)
6. [Deploying to Heroku](#deploying-to-heroku)
7. [Troubleshooting](#troubleshooting)

## Prerequisites

Before deploying, make sure you have:
- A MongoDB Atlas account (or another MongoDB provider)
- A GitHub account
- Node.js installed locally (for testing)
- npm or yarn installed

## Deploying the Backend

### Option 1: Deploy to Render

1. **Create a Render account**:
   - Go to [Render](https://render.com/) and sign up

2. **Create a new Web Service**:
   - Click "New" and select "Web Service"
   - Connect your GitHub repository

3. **Configure the service**:
   - Name: `food-delivery-backend`
   - Environment: `Node`
   - Build Command: `cd backend && npm install`
   - Start Command: `cd backend && npm start`
   - Add environment variables:
     - `MONGODB_URI`: Your MongoDB connection string
     - `JWT_SECRET`: Your JWT secret
     - `NODE_ENV`: `production`
     - `PORT`: `10000` (or any port Render assigns)

4. **Deploy**:
   - Click "Create Web Service"

### Option 2: Deploy to Heroku

1. **Install Heroku CLI**:
   ```bash
   npm install -g heroku
   ```

2. **Login to Heroku**:
   ```bash
   heroku login
   ```

3. **Create a Heroku app**:
   ```bash
   heroku create food-delivery-backend
   ```

4. **Set environment variables**:
   ```bash
   heroku config:set MONGODB_URI=your_mongodb_uri
   heroku config:set JWT_SECRET=your_jwt_secret
   heroku config:set NODE_ENV=production
   ```

5. **Deploy**:
   ```bash
   git push heroku main
   ```

## Deploying the Frontend

### Option 1: Deploy to Vercel

1. **Create a Vercel account**:
   - Go to [Vercel](https://vercel.com/) and sign up

2. **Import your repository**:
   - Click "New Project" and select your GitHub repository

3. **Configure the project**:
   - Framework Preset: `Vite`
   - Root Directory: `frontend`
   - Build Command: `npm run build`
   - Output Directory: `dist`
   - Add environment variables:
     - `VITE_API_URL`: Your backend API URL (e.g., `https://food-delivery-backend.onrender.com`)

4. **Deploy**:
   - Click "Deploy"

### Option 2: Deploy to Netlify

1. **Create a Netlify account**:
   - Go to [Netlify](https://www.netlify.com/) and sign up

2. **Import your repository**:
   - Click "New site from Git" and select your GitHub repository

3. **Configure the build settings**:
   - Base directory: `frontend`
   - Build command: `npm run build`
   - Publish directory: `dist`
   - Add environment variables:
     - `VITE_API_URL`: Your backend API URL

4. **Deploy**:
   - Click "Deploy site"

## Deploying to Render (Full Stack)

Render also supports deploying both frontend and backend in a single repository:

1. **Create a new Web Service**:
   - Connect your GitHub repository

2. **Configure the service**:
   - Name: `food-delivery-app`
   - Environment: `Node`
   - Build Command: `npm install && cd frontend && npm install && npm run build`
   - Start Command: `cd backend && npm start`
   - Add environment variables as needed

3. **Deploy**:
   - Click "Create Web Service"

## Troubleshooting

### Common Issues

1. **CORS Errors**:
   - Make sure your backend CORS configuration includes your frontend domain
   - Update the CORS configuration in `server.js`:
     ```javascript
     app.use(cors({
       origin: process.env.FRONTEND_URL || 'http://localhost:5173',
       credentials: true
     }));
     ```

2. **API Connection Issues**:
   - Ensure your frontend is using the correct API URL
   - Check that environment variables are properly set

3. **MongoDB Connection Issues**:
   - Verify your MongoDB connection string
   - Check that your IP address is whitelisted in MongoDB Atlas

4. **Build Failures**:
   - Check the build logs for specific errors
   - Ensure all dependencies are properly listed in package.json

### Getting Help

If you encounter issues not covered in this guide:
- Check the documentation for your hosting provider
- Search for similar issues on Stack Overflow
- Reach out to the support team of your hosting provider 