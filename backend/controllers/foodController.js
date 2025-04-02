// filepath: /home/cassiano/Área de trabalho/food_del/backend/controllers/foodController.js
import FoodModel from '../models/foodModel.js';
import fs from 'fs'
export const addFood = async (req, res) => {
    let image_filename = `${req.file.filename}`
    const food = new FoodModel({
        name:req.body.name,
        description:req.body.description,
        price:req.body.price,
        category:req.body.category,
        image:image_filename
    })
    try{
        await food.save()
        res.json({success:true,message:"food added"})
    }catch(err){
        console.log(err)
        res.json({success:false,message:"Error"})
    }
};
//all food list
export const listFood = async (req,res)=>{
    try{
        const foods = await FoodModel.find({})
        res.json({success:true,data:foods})
    }catch(err){    
        console.log(err)
        res.json({success:false,message:"Error"})
    }
}
//remove food item 
export const removeFood = async (req,res)=>{
    try{
        const food = await FoodModel.findById(req.body.id)
        fs.unlink(`uploads/${food.image}`,()=>{})
        await FoodModel.findByIdAndDelete(req.body.id)
        res.json({success:true,message:"food remove"})
    }catch(err)
    {
        console.log(err)
        res.json({success:false,message:"err"})
    }
}