import express from 'express';
import { param, body } from 'express-validator';

import { 
    getLogs,
    getLogsByTaskId
} from '../controllers/log.controller.js';

const logRouter = express.Router();

logRouter.get("/", getLogs);

logRouter.get("/task/:taskId", getLogsByTaskId);


export default logRouter