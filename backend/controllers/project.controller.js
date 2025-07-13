import Project from "../models/project.model.js";
import Task from "../models/task.model.js";
import { validationResult } from "express-validator";

export const getProjects = async (req, res) => {
    try {
        const result = await Project.find().populate([{
            path: "members.data",
            select: "name email _id"
        }]);
        res.status(200).json(result);
    }
    catch (error) {
        res.status(500).json({ error : error.message });
    }
}

export const createProject = async (req, res) => {
    try {
        const error = validationResult(req);
        if (!error.isEmpty()) {
            return res.status(400).json({ error : "Invalid data." });
        }

        const checkProject = await Project.findOne({ title : req.body.title });
        if (checkProject) {
            return res.status(409).json({ error : "Project already exists" });
        }

        const result = await Project.insertOne(req.body);
        if (!result) {
            return res.status(500).json({ error: "Error inserting projcet." });
        }

        res.status(200).json({ message: "Success inserting project." });
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
}

export const getProjectById = async (req, res) => {
    try {
        const error = validationResult(req);
        if (!error.isEmpty()) {
            return res.status(400).json({ error: "invalid data." });
        }

        const result = await Project.findOne({ _id: req.params.id });
        if (!result) {
            return res.status(404).json({ error: "Project not found." });
        }

        res.status(200).json(result);
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
}

export const updateProject = async (req, res) => {
    try {
        const error = validationResult(req);
        if (!error.isEmpty()) {
            return res.status(400).json({ error: "invalid data." });
        }

        await Project.findOneAndUpdate(
            { _id : req.params.id },
            { $set : req.body }
        )
        .then(() => {
            res.status(200).json({ message: "Success updating project." });
        })
        .catch((error) => {
            return res.status(500).json({ error: error.message });
        });
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
}

export const deleteProject = async (req, res) => {
    try {
        const error = validationResult(req);
        if (!error.isEmpty()) {
            return res.status(400).json({ error: "Invalid data." });
        }

        await Project.findOneAndDelete({ _id: req.params.id })
        .then(() => {
            res.status(200).json({ message: "Success deleting project." });
        })
        .catch((error) => {
            return res.status(500).json({ error: error.message });
        });
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
}

export const getProjectMembers = async (req, res) => {
    try {
        const error = validationResult(req);
        if (!error.isEmpty()) {
            return res.status(400).json({ error: "Invalid data." });
        }

        const result = await Project.findOne({ _id: req.params.id }).select("members").populate({
            path: "members.data",
            select: "_id name email"
        })

        if (!result) {
            return res.status(404).json({ message: "Project not found." });
        }

        res.status(200).json(result);


    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
}



export const addProjectMember = async (req, res) => {
    try {
        const error = validationResult(req);
        if (!error.isEmpty()) {
            return res.status(400).json({ error: "Invalid data." });
        }

        const newMember = {
            data: req.body.data, 
            assignedAt: new Date(), 
            assignedBy: req.body.assignedBy
        }

        await Project.findOneAndUpdate(
            { _id: req.params.id },
            { $push: { members: newMember } },
            { new: true, runValidators: true } 
        )
        .then(() => {
            res.status(200).json({ message: "Success adding member." });
        })
        .catch((error) => {
            return res.status(500).json({ error: error.message });
        });
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
}

export const removeProjectMember = async (req, res) => {
    try {
        const error = validationResult(req);
        if (!error.isEmpty()) {
            return res.status(400).json({ error: "Invalid data." });
        }

        await Project.findOneAndUpdate(
            { _id: req.params.id },
            { $pull: { members: { data: req.body.memberId } } },
            { new: true, runValidators: true } 
        )
        .then(() => {
            res.status(200).json({ message: "Success deleting member." });
        })
        .catch((error) => {
            return res.status(500).json({ error: error.message });
        });
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
}


export const getProjectTasks = async (req, res) => {
    try {
        const error = validationResult(req);
        if (!error.isEmpty()) {
            return res.status(400).json({ error: "Invalid data." });
        }

        const result = await Task.find({ projectId: req.params.id });

        if (!result) {
            return res.status(404).json({ message: "Project not found." });
        }

        res.status(200).json(result);


    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
}