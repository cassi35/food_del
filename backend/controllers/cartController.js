import UserModel from '../models/UserModel.js' 
import userRouter from '../routes/userRoute.js'
//add items to user cart
export const addToCart = async (req,res)=>{
    try{
        let user_data = await UserModel.findById(req.body.userId)
        let cartData= await user_data.cartData
        if(!cartData[req.body.itemId]){
            cartData[req.body.itemId] = 1
        }else{
            cartData[req.body.itemId] += 1
        }
        await UserModel.findByIdAndUpdate(req.body.userId,{cartData})
        console.log(cartData)
        res.json({success:true,message:"added to cart"})
    }catch(err){
        console.log(err)
        res.json({success:false,message:"error"})

    }
}

//remove items from user cart 
export const removeFromCart = async (req,res)=>{
    try {
        let userData = await UserModel.findById(req.body.userId)
        let cartData = await userData.cartData
        if(cartData[req.body.itemId]> 0){
            cartData[req.body.itemId]-=1
        }
        await UserModel.findByIdAndUpdate(req.body.userId,{cartData})
        res.json({success:true,message:"removed from cart"})
    } catch (error) {
        console.log(error)
        res.json({success:false,message:"Error"})
    }
}
//fecth user cart data
export const getCart = async (req,res)=>{
    try {
        let userData = await UserModel.findById(req.body.userId)
        let cartData = await userData.cartData
        res.json({success:true,cartData})
    } catch (error) {
       console.log(error)
       res.json({success:false,cartData})
    }
}