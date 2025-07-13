import Task from "../models/task.model.js";
import User from "../models/user.model.js"
import { validationResult } from "express-validator";
import { createTaskLog, createSubtaskLog, createCommentLog } from "./log.controller.js";

export const getTasks = async (req, res) => {
    try {
        const result = await Task.find();
        res.status(200).json(result);
    } 
    catch(error) {
        res.status(500).json({ error: error.message });
    }
}

export const createTask = async (req, res) => {
    try {
        const error = validationResult(req);
        if (!error.isEmpty()) {
            return res.status(400).json({ error: "Invalid data." });
        }

        const values = req.body

        const result = await Task.insertOne(values);
        if (!result) {
            return res.status(500).json({ error: "Error inserting task." });
        }

        const log = await createTaskLog(result.id, values.title , "created", values.createdBy, { });
        if (!log) {
            return res.status(400).json({ error: "Error inserting log." });
        }
        
        res.status(200).json({ message: "Success inserting task."});

    }
    catch(error) {
        res.status(500).json({ error: error.message });
    }
}

export const getTaskById = async (req, res) => {
    try {
        const error = validationResult(req);
        if (!error.isEmpty()) {
            return res.status(400).json({ error: "Invalid data." });
        }

        const result = await Task.findOne({_id : req.params.id}).populate([
            {
                path : "createdBy",
                select : "name email"
            },

            {
                path : "assignedTo",
                select : "name email"
            },

            {
                path : "projectId",
                select : "title"
            },

            {
                path : "comments.createdBy",
                select : "name email"
            },

            {
                path: "comments.replies.createdBy",
                select: "_id name email",
            }
        ]);

        if (!result) {
            return res.status(404).json({ error: "Task not found." });
        }

        res.status(200).json(result);
    }
    catch(error) {
        res.status(500).json({ error: error.message });
    }
}

export const getTasksByProjectId = async (req, res) => {
    try {
        const error = validationResult(req);
        if (!error.isEmpty()) {
            return res.status(400).json({ error: "Invalid data." });
        }

        const result = await Task.find({ projectId : req.params.projectId }).populate([
            {
                path : "createdBy",
                select : "name email"
            },

            {
                path : "assignedTo",
                select : "name email"
            },

            {
                path : "projectId",
                select : "title"
            },
            
            {
                path : "comments.createdBy",
                select : "name email"
            },
            
            {
                path: "comments.replies.createdBy",
                select: "_id name email",
            }
        ]);

        if (!result) {
            return res.status(404).json({ error: "Task not found." });
        }

        res.status(200).json(result);
    }
    catch(error) {
        res.status(500).json({ error: error.message });
    }
}


export const updateTask = async (req, res) => {
    try {
        const error = validationResult(req);
        if (!error.isEmpty()) {
            return res.status(400).json({ error: "Invalid data." });
        }

        await Task.findOneAndUpdate(
            { _id: req.params.id },
            { $set : req.body },
            { runValidators: true }
        ).then(() => {
            res.status(200).json({ message: "Success updating task." });
        })
        .catch(error => {
            return res.status(500).json({ error: error.message });
        });
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
}

export const deleteTask = async (req, res) => {
    try {
        const error = validationResult(req);
        if (!error.isEmpty()) {
            return res.status(400).json({ error: "Invalid data." });
        }

        const result = await Task.findOneAndDelete({ _id: req.params.id });

        if (!result) {
            return res.status(404).json({ error: "Task not found." });
        }

        return res.status(200).json({ message: "Success deleting task." });
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
}



export const updateSubtaskStatus = async (req, res) => {
    try {
        const error = validationResult(req);
        if (!error.isEmpty()) {
            return res.status(400).json({ error: "Invalid data." });
        }

        const { id, subtaskId } = req.params;
        const values = req.body;

        const taskBeforeUpdate = await Task.findOne({ _id: id }); 

        const result = await Task.findOneAndUpdate(
            { _id: id, 'subtasks._id': subtaskId },
            { $set: 
                {
                    'subtasks.$.checked': values.checked, 
                }
            },
            { new: true, runValidators: true }
        );

        if (!result) {
            return res.status(500).json({ error: error.message });
        }

        const log = await createSubtaskLog(id, values.title , "checklist", values.updatedBy, { newValue: values.checked });

        if (!log) {
            return res.status(400).json({ error: "Error inserting log." });
        }


        const checkedSubtasks = result.subtasks.filter(subtask => subtask.checked);

        if (checkedSubtasks.length === result.subtasks.length) {
            const data = {
                oldValue: taskBeforeUpdate.status,
                newValue: "Completed"
            }
            
            const log = await createTaskLog(id, result.title , "moved", values.updatedBy, data);
            if (!log) {
                return res.status(400).json({ error: "Error inserting log." });
            }
            

            const status = await Task.findOneAndUpdate(
                { _id: id, 'subtasks._id': subtaskId },
                { $set: { status: data.newValue } }
            );

            if (!status) {
                return res.status(500).json({ error: "Error updating status" });
            }
        }

        else if (checkedSubtasks.length === 0) {
            const data = {
                oldValue: taskBeforeUpdate.status,
                newValue: "To Do"
            }
            
            const log = await createTaskLog(id, result.title , "moved", values.updatedBy, data);
            if (!log) {
                return res.status(400).json({ error: "Error inserting log." });
            }
            

            const status = await Task.findOneAndUpdate(
                { _id: id, 'subtasks._id': subtaskId },
                { $set: { status: data.newValue } }
            );

            if (!status) {
                return res.status(500).json({ error: "Error updating status" });
            }
        }

        else if (taskBeforeUpdate.status === "Completed" && checkedSubtasks.length < result.subtasks.length) {
            const data = {
                oldValue: taskBeforeUpdate.status,
                newValue: "In Progress"
            }
            
            const log = await createTaskLog(id, result.title , "moved", values.updatedBy, data);
            if (!log) {
                return res.status(400).json({ error: "Error inserting log." });
            }

            const status = await Task.findOneAndUpdate(
                { _id: id, 'subtasks._id': subtaskId },
                { $set: { status: data.newValue } }
            );

            if (!status) {
                return res.status(500).json({ error: "Error updating status" });
            }
        }

        else if (taskBeforeUpdate.status === "To Do" && checkedSubtasks.length > 0) {
            const data = {
                oldValue: taskBeforeUpdate.status,
                newValue: "In Progress"
            }
            
            const log = await createTaskLog(id, result.title , "moved", values.updatedBy, data);
            if (!log) {
                return res.status(400).json({ error: "Error inserting log." });
            }

            const status = await Task.findOneAndUpdate(
                { _id: id, 'subtasks._id': subtaskId },
                { $set: { status: data.newValue } }
            );

            if (!status) {
                return res.status(500).json({ error: "Error updating status" });
            }
        }
        
        res.status(200).json(result);

    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
}


export const updateComments = async (req, res) => {
    try {
        const error = validationResult(req);
        if (!error.isEmpty()) {
            return res.status(400).json({ error: "Invalid data." });
        }

        const { id } = req.params;

        const newComment = req.body;

        console.log(req.body)

        const result = await Task.findOneAndUpdate(
            { _id: id },
            { $push: { comments: newComment } },
            { new: true, runValidators: true }
        ).populate([
            { path: "comments.createdBy", select: "_id name email" },
            { path: "comments.replies.createdBy", select: "_id name email" },
        ]);

        if (!result) {
            return res.status(404).json({ error: "Task not found." });
        }


        const log = await createCommentLog(
            id, 
            result.title, 
            "added", 
            newComment.createdBy, 
            { newValue: newComment.text }
        );

        if (!log) {
            return res.status(400).json({ error: "Error inserting log." });
        }

        res.status(200).json(result);
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
}

export const updateReplies = async (req, res) => {
    try {
        const error = validationResult(req);
        if (!error.isEmpty()) {
            return res.status(400).json({ error: "Invalid data." });
        }

        const newReply = {
            createdBy: req.body.createdBy,
            text: req.body.text,
        };



        await Task.findOneAndUpdate(
            { _id: req.params.id, "comments._id": req.params.commentId }, 
            { $push: { "comments.$.replies": newReply } },               
            { new: true, runValidators: true }                           
        )
        .populate([
            {
            path: "comments.createdBy",
            select: "_id name email",
            },
            {
            path: "comments.replies.createdBy",
            select: "_id name email",
            },
        ])
        .then((response) => {
            res.status(200).json(response);
        })
        .catch((error) => {
            return res.status(500).json({ error: error.message });
        });

    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
}

export const deleteComment = async (req, res) => {
    try {
        const error = validationResult(req);
        if (!error.isEmpty()) {
            return res.status(400).json({ error: "Invalid data." });
        }
        
        const commentId = req.params.commentId;

        await Task.findOneAndUpdate(
            { _id: req.params.id },
            { $pull: { comments: { _id: commentId } } })
        .then(() => {
            res.status(200).json({ message: "Success deleting comment." });
        })
        .catch((error) => {
            return res.status(500).json({ error: error.errors.status.message });
        });
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
}
