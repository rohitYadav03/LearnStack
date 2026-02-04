import express from "express"
import { PORT } from "./config/serverConfig.js";
import v1Router from "./routes/routes.js";
import cookieParser from "cookie-parser";
import "./scheduler/reminderScheduler.js";
import "./jobs/emailWorker.js" 
// Backgound jobs must start with the server , not tied to http request
import cors from "cors"

const app = express();

app.use(cors({
  origin: "http://localhost:5173",
  credentials: true,
  methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"]
}));

app.use(express.json());
app.use(cookieParser());

app.use("/api/v1", v1Router);

app.listen(PORT, () => {
    console.log(`server is running ${PORT}`)
});

