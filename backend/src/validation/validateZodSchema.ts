import type { NextFunction, Request, Response } from "express";
import type { ZodObject } from "zod";
import {z} from "zod"

const validate = (schema : ZodObject) => {
  
    return (req : Request,res : Response,next : NextFunction) => {
        try {
         schema.parse(req.body);
         next();
        } catch (error : any) {
  console.error("Validate middleware error", error);

   if (error instanceof z.ZodError) {
  // Map Zod issues to a field: message object
  const formattedErrors: Record<string, string> = {};
  error.issues.forEach(issue => {
    const field = issue.path.join(".") || "unknown";
    formattedErrors[field] = issue.message;
  });

  return res.status(400).json({
    message: "Validation failed",
    errors: formattedErrors
  });
}

// Fallback for other types of errors
return res.status(500).json({ message: (error as Error).message });
        }
    }
}

export default validate;