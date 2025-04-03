import jwt from 'jsonwebtoken'
export const authMiddleWare = async (req,res,next)=>{
    const {token} = req.headers;
    console.log(!token)
    console.log(req.user)
    if(!token){
        return res.json({success:false,message:"not authorixed login again "})
    }
    try{
        const token_decode = jwt.verify(token,process.env.JWT_SECRET)
        req.body.userId = token_decode.id 
        next()
    }catch(err){
        console.log(err)
        res.json({success:false,message:"Error"})
    }
}