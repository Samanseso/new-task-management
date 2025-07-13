import express from 'express';
import { body, param } from 'express-validator';

import { 
    getProjects,
    getProjectById,
    createProject,
    updateProject,
    deleteProject,
    getProjectMembers,
    addProjectMember,
    removeProjectMember,
    getProjectTasks,
} from '../controllers/project.controller.js';

const projectRouter = express.Router();

// get all project
projectRouter.get("/", getProjects);

// get prject by id
projectRouter.get("/:id", [
    param("id").notEmpty().isMongoId()
], getProjectById);

// create project
projectRouter.post("/", [
    body("title").notEmpty().escape(),
    body("createdBy").notEmpty().isMongoId().escape()
], createProject);

// update project
projectRouter.patch("/:id", [
    param("id").notEmpty().isMongoId()
], updateProject);

// delete project
projectRouter.delete("/:id", [
    param("id").notEmpty().isMongoId()
], deleteProject);

// get project members
projectRouter.get("/:id/members", [
    param("id").notEmpty().isMongoId().escape()
], getProjectMembers)

// add project members
projectRouter.post("/:id/members", [
    param("id").notEmpty().isMongoId(),
    body("data").notEmpty().isMongoId(),
    body("assignedBy").notEmpty().isMongoId()
], addProjectMember);

// delete project members
projectRouter.delete("/:id/members/:memberId", [
    param("id").notEmpty().isMongoId(),
    param("memberId").notEmpty().isMongoId(),
], removeProjectMember);

// get project tasks
projectRouter.get("/:id/tasks", [
    param("id").notEmpty().isMongoId().escape()
], getProjectTasks);    




export default projectRouter;
