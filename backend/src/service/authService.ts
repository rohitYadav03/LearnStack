import client from "../config/prismaClient.js";
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import { jwtPassword } from "../config/serverConfig.js";

export async function signupUserService({username , password, email} : {username : string, password : string, email : string}){

    const existingUser = await client.user.findFirst({
        where  : {
            OR : [
            {username : username},
            {email : email}
            ]
        }
    })

    if(existingUser){
        throw new Error("username and Email should be unique")
    }
 
    // hash password
    const hashPassword = await bcrypt.hash(password, 10);

    const user = await client.user.create({
        data : {
            username : username,
            password : hashPassword,
            email : email
        }
    })

    return user; 
}

export async function signinService(username: string , password : string){

   const userDetails = await client.user.findUnique({
    where : {
        username : username
    }
   })

   if(!userDetails){
    throw new Error("Username not found")
   }

   const correctPassword = await bcrypt.compare(password, userDetails.password);

   if(!correctPassword){
    throw new Error("Incorrect Password")
   }
   
   const jwtToken =  jwt.sign({id : userDetails.id, username : userDetails.username , email : userDetails.email},jwtPassword as string, {expiresIn : "30d"})

   return jwtToken;

}
