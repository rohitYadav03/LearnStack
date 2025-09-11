import schedule from "node-schedule"
import client from "../config/prismaClient.js"
import emailQueue from "../jobs/emailQueue.js"

console.log("Inside the reminder schedule ");

let num = 1;

const job = schedule.scheduleJob('*/1 * * * *', async() => {
      console.log(`🚀 SCHEDULER EXECUTED - Run #${num} - Time: ${new Date().toISOString()}`);
    num++;

    try {
    console.log("About to query database...");

    const allTasks = await client.task.findMany({
                    where : {
                        reminderDate : {
                            lte : new Date()
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
            console.log("No tasks found, skipping...");
        console.log(`[${new Date().toISOString()}] No reminder tasks due`);
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
                    where: { id: task.id },
                    data: { lastReminderSentAt: new Date() }
                });
                
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
