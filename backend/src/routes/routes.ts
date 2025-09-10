import express from "express"
import authRouter from "./v1/authRoutes.js";
import taskRouter from "./v1/taskRouter.js";
import shareRouter from "./v1/shareRouter.js";

const v1Router = express.Router();
console.log("Inside v1 router");

v1Router.use("/auth", authRouter)
v1Router.use("/task", taskRouter)
v1Router.use("/share", shareRouter)

export default v1Router;