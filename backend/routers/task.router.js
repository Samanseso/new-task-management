import express from "express";
import { param, body } from "express-validator";

import {
    getTasks,
    createTask,
    getTaskById,
    getTasksByProjectId,
    updateTask,
    deleteTask,
    updateSubtaskStatus,
    updateComments,
    deleteComment,
    updateReplies
} from "../controllers/task.controller.js"

const taskRouter = express.Router();


// comments
taskRouter.patch("/:id/comment", [
    param("id").notEmpty().isMongoId().escape(),
    body("createdBy").notEmpty().isMongoId().escape(),
    body("text").notEmpty().escape()
],
updateComments);

taskRouter.patch("/:id/comment/:commentId/reply", [
    param("id").notEmpty().isMongoId().escape(),
    param("commentId").notEmpty().isMongoId().escape(),
    body("createdBy").notEmpty().isMongoId().escape(),
    body("text").notEmpty().escape()
],
updateReplies);

taskRouter.delete("/:id/comment/:commentId", [
    param("id").notEmpty().isMongoId().escape(),
],
deleteComment);



// subtasks
taskRouter.patch("/:id/subtask/:subtaskId", [
    param("id").notEmpty().isMongoId().escape(),
    param("subtaskId").notEmpty().isMongoId().escape(),
    body("title").notEmpty().escape(),
    body("checked").notEmpty().isBoolean().escape(),
    body("updatedBy").notEmpty().isMongoId().escape(),
],
updateSubtaskStatus);



// tasks
taskRouter.get("/", getTasks);

taskRouter.post("/", [
    body("title").notEmpty().escape(),
    body("projectId").notEmpty().isMongoId().escape(),
    body("createdBy").notEmpty().isMongoId().escape(),
], createTask);

taskRouter.get("/:id", 
    param("id").notEmpty().isMongoId().escape(),
getTaskById);

taskRouter.get("/project/:projectId", 
    param("projectId").notEmpty().isMongoId().escape(),
getTasksByProjectId);

taskRouter.patch("/:id", [
    param("id").notEmpty().isMongoId().escape(),
],
updateTask);

taskRouter.delete("/:id", [
    param("id").notEmpty().isMongoId().escape(),
    body("deletedBy").notEmpty().isMongoId().escape(),
], deleteTask);






export default taskRouter;