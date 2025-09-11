import { Worker } from "bullmq";
import transporter from "../services/mailService.js";
import connection from "../config/redisClient.js";
console.log("Email worker started and listening...");



const emailWorker = new Worker("email", async(job) => {
    try {
        console.log("Email worker started and listening...2");

        await transporter.sendMail(job.data);
        console.log("inside the job data : ", job.data);
        
            console.log(`Email sent to ${job.data.to}`);

    } catch (error) {
            console.log("Error in worker",error );
    }
}, {connection : connection})

export default emailWorker;