import type { NextFunction, Request, Response } from "express";
import type { ZodObject } from "zod";


const validate = (schema : ZodObject) => {
    return (req : Request,res : Response,next : NextFunction) => {
        try {
         schema.parse(req.body);
         next();
        } catch (error : any) {
     return res.status(400).json({ messages: error.errors })
        }
    }
}

export default validate;