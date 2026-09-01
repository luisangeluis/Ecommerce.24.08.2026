import { NextFunction, Request, Response } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import { jwtSecret } from "../../dev.env";

interface AuthPayload extends JwtPayload {
    userId: string;
}

const authMiddleware = (req:Request, res:Response, next:NextFunction)=>{
    const authorization  = req.headers.authorization;
    
    if(!authorization){
        return res.status(401).json({message:"Authorization header missing"});
    }

    const [type, token] = authorization.split(" ");

    if(type !== "Bearer" || !token){
        return res.status(401).json({message:"Invalid authorization header"});
    }

    try{
        const payload = jwt.verify(token, jwtSecret) as AuthPayload;  
        
        req.userId = payload.userId;

        next();
    }catch(err){
         return res.status(401).json({
            message: "Invalid or expired token"
        });
    }
}

export default authMiddleware;