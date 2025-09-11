import client from "../config/prismaClient.js"
import { TaskStatus } from "@prisma/client"

export async function createTaskService({title, type, link = null, why, tags = [], reminderDate, userId} : {title : string, type : any, link: string | null, why : string, tags ?: string[], reminderDate : Date, userId : number} ){

   const task = await client.task.create({
    data : {
        title,
        type,
        link,
        why,
        reminderDate,
        userId
    }
   })

   for(let eachTag of tags){
   
const tagExist = await client.tag.findUnique({
    where : {
        title : eachTag
    }
})

if(!tagExist){
    // here it come means that tag does not exist , means we need to create it 
 const newTag =    await client.tag.create({
        data : {
            title : eachTag
        }
    })

    const tagTabel = await client.taskTag.create({
        data : {
            tagId : newTag.id,
            taskId : task.id
        }
    })
}else {
    await client.taskTag.create({
    data : {
        tagId : tagExist!.id,
        taskId : task.id
    }
})
}

// now push it into the tasktag table if the tag alredy exist 


}

return task;

}


export async function getUserTaskService(userId : number) {
    
const allUserTasks = await client.task.findMany({
    where : {
        userId : userId
    },
    orderBy : { createdAt : "desc" } ,
    include : { // include -> relations ko automatically fetch karta hai.
        tags : {
            select : {
                tag : {
                         select : {
                            title : true
                         }
                }
            }
        }
    }
})
return allUserTasks;


}

export const  getTaskByIdService = async (id : number, userId : number) => {
     const taskDetails = await client.task.findFirst({
        where : {
            id : id,
            userId : userId
        },
        include :{
            tags : {
                select : {
                    tag : {
                        select  : {
                            title : true
                        }
                    }
                }
            }
        }
     })

     return taskDetails
}

type UpdateTaskInput = {
  title?: string;
  status?: TaskStatus;
  reminderDate?: Date;
};

export const updateTaskByIDService = async(taskId : number, userId : number, data : UpdateTaskInput) => {


const updatedTask = await client.task.update({
    where : {
        userId : userId,
        id : taskId
    }, 
    data : data,
})

return updatedTask;
}


export const deleteTaskByIdService = async(taskId : number,userId : number) => {
  
    // first check wheather that taks belong to that user or not , then delte from tasktag tabel 
    // and then delete the task 

    const taskBelongToUser = await client.task.findFirst({
        where : {
            id : taskId,
            userId : userId
        }
    })

    if(!taskBelongToUser){
        return "Task doesnt belong to the user"
    }

    console.log("task : ", taskBelongToUser);
    // no here it come means that the task belong to user and want to delete so delete form the task tabel first 

     await client.taskTag.deleteMany({
        where : {
            taskId : taskBelongToUser.id
        }
    })

    // now it is delted from task tabel now we can delete form the task tabel
    const deleteTask = await client.task.delete({
        where : {
                 id : taskId
        }
    });

    return deleteTask
}
 

export const markAsCompletedService = async(taskId : number, userId : number) => {

// first lets check whaether that task belong to the user and then we will update it 

const taskBelongToUser = await client.task.findFirst({
    where : {
        id : taskId,
        userId : userId
    }
})

if(!taskBelongToUser){
    return "Task does not belong to the user"
}

    const markTaskCompleted = await client.task.update({
        where : {
            id : taskId
        }, 
        data : {
            status : "COMPLETED"
        }
    })

    return markTaskCompleted;
}