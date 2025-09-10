import type { Request, Response } from "express";
import { disbleSharingService, enableShareService, getUserTaskService } from "../service/shareService.js";


export async function enableShareController(req : Request, res : Response) {
    try {
        
        const userId = Number(req.user!.id);
        const updatedInfo = await enableShareService(userId);
        return res.status(200).json({message : "Updated done", data : updatedInfo})

    } catch (error) {
                return res.status(400).json({message : "something went wrong"})
    }
}

export async function disbleShareController(req : Request , res : Response){
    try {
        const userId = Number(req.user!.id);

        const updatedShare = await disbleSharingService(userId)
        return res.status(200).json({message : "Updated done", data : updatedShare})

    } catch (error) {
    return res.status(400).json({message : "something went wrong"})

    }
}

export async function getOtherUserController(req : Request , res : Response) {
    try {
        const shareLink = req.params.shareLink;

        if(!shareLink){
            return res.status(400).json({message : "Sharelink not found"})
        }

        const userDetails = await getUserTaskService(shareLink)
            return res.status(200).json({message : userDetails})

    
    } catch (error) {
                    return res.status(400).json({message : "error"})

    }
}