// filepath: /home/cassiano/Área de trabalho/food_del/backend/controllers/foodController.js
import FoodModel from '../models/foodModel.js';

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