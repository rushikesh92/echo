import jwt from 'jsonwebtoken'
import User from '../models/User.model.js';

export const verifyJWT = async (req , res , next)=>{
    
    const token = req.cookies?.jwt;
    if(!token){
        return res.status(401).json({message:"Unauthorized request."})
    }
    
    try {
        const decodedToken = jwt.verify(
            token,
            process.env.JWT_SECRET
        );

        const user = await User.findById(decodedToken?.userId);
        if(!user){
           return res.status(401).json({message:"Invalid access token."})
        }
        req.user = user;
        next();
        
    } catch (error) {
        console.log("Error while verifying JWT: ", error);
        return res.status(500).json({message:"Internal server error"});
    }
}