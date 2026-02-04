import express from "express";
import { authMeController, logoutController, signinController, signupController } from "../../controller/authController.js";
import validate from "../../validation/validateZodSchema.js";
import { signInSchema, signupSchema } from "../../utils/zodSchema.js";
import authMiddleware from "../../middleware/authMiddleware.js";

const authRouter = express.Router();


authRouter.post("/signup",validate(signupSchema) ,signupController);
authRouter.post("/login", validate(signInSchema), signinController)
authRouter.post("/logout", authMiddleware, logoutController);
authRouter.get("/me",authMiddleware,authMeController)

export default authRouter;