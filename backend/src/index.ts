import express from "express"
import { PORT } from "./config/serverConfig.js";
import v1Router from "./routes/routes.js";
import cookieParser from "cookie-parser";

const app = express();

app.use(express.json())
app.use(cookieParser())

app.use("/api/v1", v1Router)

app.listen(PORT, () => {
    console.log(`Running`)
})
