import express from "express";
import { logoutController, signinController, signupController } from "../../controller/authController.js";
import validate from "../../validation/validateZodSchema.js";
import { signInSchema, signupSchema } from "../../utils/zodSchema.js";
import authMiddleware from "../../middleware/authMiddleware.js";

const authRouter = express.Router();


authRouter.post("/signup",validate(signupSchema) ,signupController);
authRouter.post("/login", validate(signInSchema), signinController)
authRouter.post("/logout", authMiddleware, logoutController)

export default authRouter;