import nodemailer from "nodemailer";
import { appPassword, gmailUsername } from "../config/serverConfig.js";

const transporter  = nodemailer.createTransport({
     service : "gmail",
     auth : {
            user : gmailUsername,
    pass : appPassword
     }
})

export default transporter;