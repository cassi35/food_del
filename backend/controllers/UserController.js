import UserModel from '../models/UserModel.js';
import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'
import validator from 'validator'
//login user 
export const loginUser = async (req,res)=>{
    const {email,password} = req.body
    try {
        const user = await UserModel.findOne({email})
        if(!user){
            return res.json({success:false,message:"user doesn't exists"})
        }
        const isMatch = await bcrypt.compare(password,user.password)
        if(!isMatch){
            return res.json({success:false,message:"invalid credintials"})
        }
        const token = createToken(user._id)
        res.json({success:true,token})

    } catch (error) {
            console.log(error)
            res.json({success:false,message:"err"})
    }
}
export const createToken = (id)=>{
    return jwt.sign({id},process.env.JWT_SECRET)
}
//register user
 export const registerUser = async (req,res)=>{
    const {name,email,password} = req.body
    try{
        const exists = await UserModel.findOne({email})
        if(exists){
            return res.json({success:false,message:"user already exists"})
        }
        if(!validator.isEmail(email)){
            return res.json({success:false,message:"plase enter a vaid email"})
        }
        if(password.length < 8 ){
            return res.json({success:false,message:"please enter a strogg password"})
        }
        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password,salt)
        const newUser = new UserModel({
            name:name,
            email:email,
            password:hashedPassword // tem que passar o brcpy para comparar no login nao a senha do usuario
        })
      const user =   await newUser.save()
      const token = createToken(user._id)
      res.json({success:true,token})
    }catch(err){
        console.log(err)
        res.json({success:false,message:"error"})
    }
}
