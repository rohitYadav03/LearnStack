import dotenv from "dotenv"
dotenv.config()


export const PORT = process.env.PORT
export const jwtPassword = process.env.JWT_PASSWORD
export const gmailUsername = process.env.GMAIL_USER
export const appPassword = process.env.GMAIL_PASS
