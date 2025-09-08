import express from "express"
import { PORT } from "./config/serverConfig.js";


const app = express();

app.get("/", (req, res) => {
    res.send("hello world")
})

app.listen(PORT, () => {
    console.log(`Running in port ${PORT}`)
})
