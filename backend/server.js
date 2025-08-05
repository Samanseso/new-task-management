import express from 'express';
import cors from 'cors';
import 'dotenv/config';
import { dbConnect } from './db.js';

import userRouter from './routers/user.router.js';
import taskRouter from './routers/task.router.js';
import projectRouter from './routers/project.router.js';
import logRouter from './routers/log.router.js';

dbConnect();

const PORT = process.env.PORT;

const allowedOrigins = ['https://eclectic-conkies-c73a3e.netlify.app'];


const app = express();






app.use(express.json());
app.use(cors({
  origin: allowedOrigins
}));

app.use("/api/v1/users", userRouter);
app.use("/api/v1/tasks", taskRouter);
app.use("/api/v1/projects", projectRouter);

app.use("/api/v1/logs", logRouter);

app.use((err, req, res, next) => {
    res.status(err.status || 500).json({ error: err.message || "Internal Server Error" });
});



app.listen(PORT, () => {
    console.log("Server running at  port " + PORT);
})
