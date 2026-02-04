import { Worker } from "bullmq";
import transporter from "../services/mailService.js";
import connection from "../config/redisClient.js";
console.log("Email worker started and listening...");

const emailWorker = new Worker("email", async(job) => {
    try {
+
        await transporter.sendMail(job.data);
        
    } catch (error) {
            console.log("Error in worker",error );
            throw error;
    }
}, {  connection })

export default emailWorker;