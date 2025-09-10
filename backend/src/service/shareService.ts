import { v4 as uuidv4 } from 'uuid';
import client from '../config/prismaClient.js';
import type { TaskStatus, TaskType } from '@prisma/client';
import { title } from 'process';


export const enableShareService = async(userId : number) => {
    // first we will genrate the random link then we will store it inide the use link section 
    // for that we should use uuid

 const randomLink =   uuidv4();
  const link =  randomLink.slice(0,8);
    
  const enableSharing = await client.user.update({
    where : {
        id : userId
    },
    data : {
        isShared : true,
        shareLink : link
    }
  })

  return enableSharing;
}

export const disbleSharingService = async(userId : number) => {
     
    const diableShare = await client.user.update({
        where : {
            id : userId
        },
        data : {
            isShared : false,
            shareLink : null,
        }
    })

    return diableShare;
}

type otherUserInfo = {
title: string,
type: TaskType,
why: string,
link: string | undefined,
status: TaskStatus,
reminderDate: string | undefined,
tags: string[],
createdAt: string
}

export const getUserTaskService = async(shareLink : string)   => {

    // first the the link is valid and user has enable the share 
const checkUserInfo = await client.user.findFirst({
    where : {
        isShared : true,
        shareLink : shareLink
    }
})
console.log("c : ",checkUserInfo);

if(!checkUserInfo){
    return "not found"
}
    // then we will send all the task of that user

    const allUserTasks = await client.task.findMany({
        where : {
            userId : checkUserInfo.id
        },
        orderBy : {
            createdAt : "desc"
        }, 
        include : {
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

    const tansformedTasks : otherUserInfo[] = allUserTasks.map(task => (
        {
   title : task.title,
   type : task.type,
   why : task.why,
   link : task.link || undefined,
   status : task.status,
   reminderDate : task.reminderDate?.toISOString(),
  createdAt : task.createdAt.toString(),
  tags : task.tags.map(t => t.tag.title)
        }
    ))

    return tansformedTasks;

}