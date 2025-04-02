import UserModel from '../models/UserModel.js';
import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'
import validator from 'validator'
//login user 
export const loginUser = async (req,res)=>{
    const {email,password} = req.body
    try{
        const user = await UserModel.findOne({email})
        if(!user){
            return res.json({success:false,message:"user doen't exists"})
        }
        const isMatch = await bcrypt.compare(password,user.password)
        if(!isMatch){
            return res.json({success:false,message:"invalid credentials"})
        }
        const token = createToken(user._id)
        res.json({success:true,token})
    }catch(err){
        console.log(err)
        res.json({success:false,message:"error"})
    }
}
export const createToken = (id)=>{
    return jwt.sign({id},process.env.JWT_SECRET)
}
//register user
 export const registerUser = async (req,res)=>{
    const {name,password,email} = req.body
    try{
        //verifica se tem usuario
        const exists = await UserModel.findOne({email})
        if(exists){
            return res.json({success:false,message:"user already exists"})
        }
        //validating email format & strong passaword
        if(!validator.isEmail(email)){
            return {success:false,message:"please enter a valid email"}
        }
        if(password.length < 8){
            return res.json({success:false,message:"please enter a strong password"})
        }
        //hasing user password
        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password,salt)
        const new_user = new UserModel({
            name:name,
            email:email,
            password:hashedPassword
        })
        const user = await new_user.save()
        const token = createToken(user._id)
        res.json({success:true,token})
    }catch(err){
        console.log(err)
        res.json({success:false,message:"error"})

    }
}
