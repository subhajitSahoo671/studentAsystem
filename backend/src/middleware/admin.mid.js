import jwt from 'jsonwebtoken'
import config from '../../config.js'

export default function adminMiddleware(req,res,next){

    const authHeader=req.headers.authorization;
    if(!authHeader || !authHeader.startsWith('Bearer')){
        return res.status(401).json({error:'No token unAuthorize'})
    }
    const token=authHeader.split(" ")[1];

    try {
     const decode=jwt.verify(token,config.JWT_ADMIN_SECRET)
     req.adminId=decode.id;
     next();    
    } catch (error) {
        console.log("ERROR !! invalid token or expire",error);
        res.status(401).json({error:'invalid token or expire'})
    }
}