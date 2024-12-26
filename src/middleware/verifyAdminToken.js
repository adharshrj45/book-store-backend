const jwt =require('jsonwebtoken')
const JWT_SECRET=process.env.JWT_SECRET_KEY;

const verifyAdminToken=(req,res,next)=>{
    const token = req.headers['authorization']?.split(' ')[1];
    if(!token){
        res.status(401).json({message:"Token not found!"})
    }
    jwt.verify(token,JWT_SECRET,(err,user)=>{
        if(err){
            return res.status(401).json({message:"Invalid Token!"})   
        }
        req.user=user;
        next();
    })
}

module.exports=verifyAdminToken