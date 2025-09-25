import express from "express";
import cors from "cors";
import connectDB from "./configs/db.js";
import "dotenv/config";
import userRouter from "./routes/userRoutes.js";
import TaskrRouter from "./routes/TaskRoutes.js";
import cookieParser from "cookie-parser";

connectDB();

const app = express();

 
app.use(
  cors({
    origin: "http://localhost:3000",  
    credentials: true,  
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],  
    allowedHeaders: ["Content-Type", "Authorization"],  
  })
);

app.use(express.json());  
app.use(cookieParser());  

// Routes
app.use("/api/user", userRouter);
app.use("/api/task", TaskrRouter);

app.get("/", (req, res) => res.send("API working fine..........."));

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
