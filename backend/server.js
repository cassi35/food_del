import express from 'express'
import cors from 'cors'
import { connectDB } from './config/db.js'
import foodRouter from './routes/foodRoute.js'
import path from 'path'
import userRouter from './routes/userRoute.js'
import 'dotenv/config.js'
import cartRouter from './routes/cartRoute.js'
//app config 
const app = express()
const port = 4000

//middleware 
app.use(express.json())
app.use(cors())

//db connction
connectDB()

//api endpoints
app.use('/api/food', foodRouter);
app.use('/images', express.static(path.join(process.cwd(), 'uploads')));
app.use("/api/user",userRouter)
app.use('/api/cart',cartRouter)
app.get('/',(req,res)=>{
    res.send("api working")
})
app.listen(port,()=>{
        console.log(`server started on http://localhost:${port} `)
})
//mongodb+srv://cgrsobral:0WHeOvoR21sAIwJo@cluster0.tccjxvn.mongodb.net/?