import type { Request, Response } from "express";
import { createTaskService, deleteTaskByIdService, getTaskByIdService, getUserTaskService, markAsCompletedService, updateTaskByIDService } from "../service/taskService.js";
import type { taskcreationinput, updateTaskSchema } from "../utils/zodSchema.js";
import type { TaskStatus } from "@prisma/client";

export  async  function createTaskController(req : Request , res :Response) {
    try {
        const {title, type, link = null, why, tags, reminderDate} = req.body as taskcreationinput;
        const userId = Number(req.user!.id) ;
        

        const taskDettails = await createTaskService({title, type, link, why, tags, reminderDate, userId})

     return   res.status(200).json({
            message : "Task created",
            taskDetails : taskDettails
        })

    } catch (error : any) {
        console.log("ERROR : ");
        console.log(error.message.Argument);
        
        
        return res.status(400).json({message : error.message })
    }
}

export async function getAllUserTaskController(req :Request, res : Response) {
    try {
        console.log("Inside the user controller");
        
        const userId = Number(req.user!.id);
        const allTasks = await getUserTaskService(userId);
    

        const serchText = req.query.type;
        if(serchText){
      const result =   allTasks.filter((eachTask) => (
                eachTask.type === serchText
            ))

            return res.status(200).json({data : result})
        }

     return res.status(200).json({data : allTasks})

    } catch (error : any) {
                return res.status(400).json({message : error.message })
    }
}

export async function getSpecifyTaskById(req : Request , res : Response){
   try {
    console.log("here ");
    
    const id = Number(req.params.id);
    console.log(id);
    
   const userId = Number(req.user!.id)
   console.log("user details", userId);
   
    const taskDetails = await getTaskByIdService(id, userId);

if(!taskDetails){
        return res.status(400).json({data : "Not found "})

} 
    return res.status(200).json({data : taskDetails})

   } catch (error) {
    return res.status(400).json({message : "Something went wrong while featching"})
   }
}

export async function updateTaskByIdController(req : Request, res : Response){
   try {
    console.log(typeof req.params.id);
    
          const taskId = Number(req.params.id);
          const userId = Number(req.user!.id);
          const {title, status , reminderDate} = req.body as updateTaskSchema

          const data : {title ?: string,status ?: TaskStatus, reminderDate ?: Date} = {} 

          if(title !== undefined) data.title = title;
          if(status !== undefined)   data.status = status.toUpperCase() as TaskStatus; 

          if(reminderDate !== undefined) data.reminderDate = reminderDate;

          const updateTaskByIdData = await updateTaskByIDService(taskId, userId,data);
          console.log("here : ",updateTaskByIdData);
          
          res.status(200).json({message : "Update done", data : updateTaskByIdData})

   } catch (error) {
    console.log(error);
    
    return res.status(400).json({message : "Something went wrong !!"})
   }
}

export async function deleteTaskByIdController(req : Request, res : Response){
    try {
        
const taskId = Number(req.params.id);
const userId = Number(req.user!.id);
console.log(`taskId1 : ${taskId}, userId : ${userId}`);


const deleteTask = await deleteTaskByIdService(taskId, userId)
console.log("delete",deleteTask);

  return res.status(200).json({message : "deleted", data : deleteTask})


    } catch (error) {
        console.log("delete controller : ", error);
        
        return res.status(400).json({message : "Something went wrong"})
    }
}

export async function updateTaskStatus(req : Request , res : Response){
    try {
        const userId = Number(req.user!.id);
        const taskId = Number(req.params.id);

        const taskUpdated = await markAsCompletedService(taskId,userId) ;

        return res.status(200).json({message : "Task completed", data : taskUpdated})

    } catch (error) {
                return res.status(400).json({message : "somehting went wrong"})

    }
}