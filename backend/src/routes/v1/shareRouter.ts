import express from "express";
import authMiddleware from "../../middleware/authMiddleware.js";
import { disbleShareController, enableShareController, getOtherUserController } from "../../controller/shareContoller.js";

const shareRouter = express.Router();


shareRouter.post("/enable",authMiddleware,enableShareController)
shareRouter.post("/disable",authMiddleware,disbleShareController)
shareRouter.get("/:shareLink", getOtherUserController)


export default shareRouter;