import { v4 as uuidv4 } from 'uuid';
import client from '../config/prismaClient.js';
import type { TaskStatus, TaskType } from '@prisma/client';


export const enableShareService = async(userId : number) => {

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

if(!checkUserInfo){
    return "not found"
}

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