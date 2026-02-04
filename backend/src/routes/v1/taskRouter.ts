import express from "express"
import authMiddleware from "../../middleware/authMiddleware.js";
import { 
    createTaskController, 
    deleteTaskByIdController, 
    getAllUserTaskController, 
    getSpecifyTaskById, 
    updateTaskByIdController, 
    updateTaskStatus } 
    from "../../controller/taskController.js";
import validate from "../../validation/validateZodSchema.js";
import { taskCreationSchema, updateTaskSchema } from "../../utils/zodSchema.js";

const taskRouter = express.Router()

taskRouter.post("/",authMiddleware,validate(taskCreationSchema), createTaskController )
taskRouter.get("/", authMiddleware,getAllUserTaskController)
taskRouter.get("/:id", authMiddleware, getSpecifyTaskById)
taskRouter.put("/:id", authMiddleware,updateTaskByIdController)
taskRouter.delete("/:id", authMiddleware, deleteTaskByIdController)
taskRouter.post("/:id/completed", authMiddleware,updateTaskStatus)

export default taskRouter;