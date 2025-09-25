import jwt from 'jsonwebtoken';
import config from '../../config.js';

export default function studentMiddleware(req,res,next){
 const authHeader=req.headers.authorization;
 try {
    if(!authHeader || !authHeader.startsWith('Bearer')){
        console.log('No token provided unauthorize');
               return res.status(401).json({error:'No token provided unauthorize'});
    }
       const token=authHeader.split(" ")[1];
       const decoded=jwt.verify(token,config.JWT_USER_SECRET);
       req.studentId=decoded.id;
       next();
 } catch (error) {
    console.log('invalid token or expire');
    res.status(401).json({error:'invalid token or expire'});
 }   
}