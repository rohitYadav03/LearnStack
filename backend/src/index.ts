import express from "express"
import { PORT } from "./config/serverConfig.js";
import v1Router from "./routes/routes.js";
import cookieParser from "cookie-parser";
import "./scheduler/reminderScheduler.js";
import "./jobs/emailWorker.js" 
// Backgound jobs must start with the server , not tied to http request
import cors from "cors"

const app = express();

const allowedOrigins = [
  "https://learnstack.rohitcodes.dev" , "https://learnstack-nu.vercel.app"
];

app.use(
  cors({
    origin: function (origin, callback) {
      // allow server-to-server & curl
      if (!origin) return callback(null, true);

      if (allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"]
  })
);



app.use(express.json());
app.use(cookieParser());

app.get("/", (req, res) => {
    res.send("Working..")
})

app.use("/api/v1", v1Router);

app.listen(PORT, () => {
    console.log(`server is running ${PORT}`)
});

