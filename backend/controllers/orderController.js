import orderModel from "../models/orderModel.js";
import UserModel from "../models/UserModel.js";
import Stripe from 'stripe'
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY)
//placing user for frontend
export const placeOrder = async (req,res)=>{
    const frontend_url = 'http://localhost:5173'
try {
        const newOrder = new orderModel({
            userId:req.body.userId,
            items:req.body.items,
            amount:req.body.amount,
            address:req.body.address,
         

        })
        await newOrder.save()
        await UserModel.findByIdAndUpdate(req.body.userId,{cartData:{}})
        const line_items = req.body.items.map((item)=>({
            price_data: {
                currency:"inr",
                product_data:{
                    name:item.name
                },
                unit_amount:item.price*100*80
            },
            quantity:item.quantity
        }))
        line_items.push({
            price_data:{
                currency:"inr",
                product_data:{
                    name:"delivery charges"
                },
                unit_amount:2*100*80
            },
            quantity:1
        })
        const session = await stripe.checkout.sessions.create({
            line_items:line_items,
            mode:'payment',
            success_url:`${frontend_url}/verify?success=true&orderId=${newOrder._id}`,
            cancel_url:`${frontend_url}/verify?success=false&orderId=${newOrder._id}`
        })
        res.json({success:true,session_url:session.url})

} catch (error) {
    console.log(error)
    res.json({success:false,message:'error'})
}
}
export const verifyOrder = async (req,res)=>{
    const {orderId,success} = req.body
    try {
        if(success == "true"){
            await orderModel.findByIdAndUpdate(orderId,{payment:true})
            res.json({success:true,message:"payment is completed"})
        }else{
            await orderModel.findByIdAndUpdate(orderId,{payment:false})
            res.json({success:false,message:"payment is not completed"})
        }
    } catch (error) {
        console.log(error)
        res.json({success:false,message:"error"})
    }
}
//user orders for fronend 
export const userOrders = async (req,res)=>{
    try {
        const orders = await orderModel.find({userId:req.body.userId})
        res.json({success:true,data:orders})
    } catch (error) {
        console.log(error)
        res.json({success:false,message:"error"})
        
    }
}