import express from 'express'
import cors from 'cors'
import { connectDB } from './config/db.js'
import foodRouter from './routes/foodRoute.js'
import path from 'path'
import { fileURLToPath } from 'url'
import userRouter from './routes/userRoute.js'
import 'dotenv/config.js'
import cartRouter from './routes/cartRoute.js'
import orderRouter from './routes/orderRoute.js'

// Get directory name in ES modules
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

//app config 
const app = express()
const port = process.env.PORT || 4000

//middleware 
app.use(express.json())

// Configuração CORS personalizada
app.use(cors({
  origin: [
    // URLs do Admin
    'https://admin-black-rho.vercel.app',
    'https://admin-ak4in7mkm-cassi35s-projects.vercel.app',
    
    // URLs do Frontend
    'https://frontend-five-amber-71.vercel.app',
    'https://frontend-8cecrn3s5-cassi35s-projects.vercel.app',
    
    // Para desenvolvimento local
    'http://localhost:5173'
  ],
  credentials: true
}));

//db connection
connectDB()

//api endpoints
app.use('/api/food', foodRouter);
app.use('/images', express.static(path.join(__dirname, 'uploads')));
app.use("/api/user", userRouter)
app.use('/api/cart', cartRouter)
app.use('/api/order', orderRouter)

// Serve static files in production
if (process.env.NODE_ENV === 'production') {
  // Set static folder
  app.use(express.static(path.join(__dirname, '../frontend/dist')))
  
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, '../frontend', 'dist', 'index.html'))
  })
} else {
  app.get('/', (req, res) => {
    res.send("API working")
  })
}

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack)
  res.status(500).json({ success: false, message: 'Something broke!' })
})

app.listen(port, () => {
  console.log(`Server started on http://localhost:${port}`)
})
//mongodb+srv://cgrsobral:0WHeOvoR21sAIwJo@cluster0.tccjxvn.mongodb.net/?