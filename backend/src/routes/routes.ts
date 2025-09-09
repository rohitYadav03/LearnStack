import express from "express"
import authRouter from "./v1/authRoutes.js";

const v1Router = express.Router();
console.log("Inside v1 router");

v1Router.use("/auth", authRouter)

export default v1Router;