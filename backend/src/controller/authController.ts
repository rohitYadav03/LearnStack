import type { Request, Response } from "express";
import { signinService, signupUserService } from "../service/authService.js";
import client from "../config/prismaClient.js";


export async function signupController(req : Request, res : Response) {
    try {    
        const {username , password, email} = req.body;    
        const signupUser = await signupUserService({username, password,email}); 

        return res.status(201).json({message : 'signup successfull', userId : signupUser.id})
        

    } catch (error : any) {
        return res.status(400).json({ message: error.message });
    }
}

export async function signinController(req: Request, res: Response){
   try {

  const {username , password} = req.body;
    const token = await signinService(username, password); // here we will get that token and now we can set in the cookies without the maxAge or expiry
    
    res.cookie("authToken" , token, {
       httpOnly : true, 
        secure : true, // prod me true
        sameSite : "none",
        maxAge : 30 * 24 * 60 * 60 * 1000
    })
    
return res.status(200).json({message : 'Login success'})
   } catch (error : any) {
    return res.status(400).json({message : error.message})
   }
}

export function logoutController(req : Request, res : Response){
    try {
       res.clearCookie("authToken", {
        httpOnly : true,
        secure: true,
        sameSite : "none"
       }) 
       return res.status(200).json({message : "Logout done"})
    } catch (error) {
               return res.status(400).json({message : "something went wrong"})

    }
}

export async function authMeController (req : Request, res : Response){
try {
const user = req!.user;

const userId = Number(user?.id)

const completeUsrDetials = await client.user.findFirst({
    where : {
        id : userId
    }
})

if(!completeUsrDetials){
    return res.status(404).json({ message : "User not found"})
}

    return res.status(200).json(
        {  
             id : completeUsrDetials?.id, 
            username : completeUsrDetials?.username,
            avatarUrl: `https://robohash.org/${completeUsrDetials?.username}.png`,
            isShared : completeUsrDetials?.isShared,
            shareLink : completeUsrDetials?.shareLink 
        })
        } catch (error) {
    
    return res.status(500).json({ message : "Something went wrong"})
}  
}