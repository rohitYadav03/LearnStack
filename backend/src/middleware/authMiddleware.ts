import type { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken"
import { jwtPassword } from "../config/serverConfig.js";

type JwtPayloadType = {
    id: string;
    username: string;
    email: string;
};


const authMiddleware = (req: Request, res : Response , next : NextFunction) => {
       try {
        const authToken = req.cookies.authToken;

        if(!authToken){
            return res.status(400).json({message : "No token found, login Again"})
        }

        const decodeToken = jwt.verify(authToken, jwtPassword as string) 
  if(!decodeToken){
            return res.status(400).json({message : "Login again"})
        }


        req.user  = decodeToken as JwtPayloadType;
        next();

       } catch (error : any) {
return res.status(400).json({Error : error.message})
 
       }
}


export default authMiddleware;