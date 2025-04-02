import mongoose from "mongoose";
 export const connectDB = async ()=>{
    await mongoose.connect('mongodb+srv://cgrsobral:0WHeOvoR21sAIwJo@cluster0.tccjxvn.mongodb.net/food_del')
    .then(()=>{
        console.log("db connected")
    })
}