import { Queue } from "bullmq";
import connection from "../config/redisClient.js";

const emailQueue = new Queue("email",{connection});

export default emailQueue