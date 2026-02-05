import schedule from "node-schedule"
import client from "../config/prismaClient.js"
import emailQueue from "../jobs/emailQueue.js"
import { Prisma } from "@prisma/client"



// nodejs khud call krtha hai on the basis of the time 
const job = schedule.scheduleJob('*/10 * * * *', async() => {
    try {

    const allTasks = await client.task.findMany({
                    where : {
                        reminderDate : {
                            lte : new Date() // reminder is alredy passed or or now 
                        },
                        lastReminderSentAt : null,
                        status : "IN_PROGRESS"
                    },
                    include : {
                       user : {
                        select : {
                            email : true
                        }
                       }
                    }
    })
        
         if (allTasks.length === 0) {
            return;
        }

        for(const task of allTasks) {
            try {
               
                await emailQueue.add("email", {
                    to: task.user.email,
                    subject: task.title,
                    body: task.why,
                    html: `<p>${task.why}</p> <p>Link: <a href="${task.link}">${task.link}</a></p>` 
                });

             await client.task.update({
                where : {
                    id : task.id
                },
                data : {
                    lastReminderSentAt : new Date()
                }
             })
                
                console.log(`✅ Reminder queued for task ${task.id}`);
                
            } catch (error) {
                console.error(`❌ Failed to queue email for task ${task.id}:`, error);
            }
        }
    } catch (error) {
        console.error('❌ SCHEDULER ERROR:', error);
    }
})

console.log("Reminder job scheduled successfully");


