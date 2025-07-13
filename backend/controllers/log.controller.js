import Log from "../models/log.model.js";
import User from "../models/user.model.js";

export const getLogs = async (req, res) => {
    try {
        const result = await Log.find();
        res.status(200).json(result);
    } 
    catch(error) {
        res.status(500).json({ error: error.message });
    }
}

export const getLogsByTaskId = async (req, res) => {
    try {
        const result = await Log.find({ documentId: req.params.taskId }).populate([
            {
                path: "performedBy",
                select: "name email role"
            }
        ]);
        res.status(200).json(result);
    } 
    catch(error) {
        res.status(500).json({ error: error.message });
    }
}

export const createTaskLog = async (documentId, title, action, userId, data) => {
    const user = await User.findById(userId);

    const subtaskLog = await Log.insertOne({
        entity: "Task",
        documentId: documentId,
        title: title,
        action: action,
        performedBy: user._id,
        description: `<b>${user.name}</b> ${action} task <b>${title}</b>`,
        data: data
    });

    return subtaskLog;
}

export const createSubtaskLog = async (documentId, title, action, userId, data) => {
    const user = await User.findById(userId);

    const subtaskLog = await Log.insertOne({
        entity: "Subtask",
        documentId: documentId,
        title: title,
        action: action,
        performedBy: user._id,
        description: `<b>${user.name}</b> ${action} a subtask`,
        data: data
    });

    return subtaskLog;
}

export const createCommentLog = async (documentId, title, action, userId, data) => {
    try {
        const user = await User.findById(userId);
        if (!user) {
            throw new Error("User not found");
        }

        const commentLog = await Log.create({
            entity: "Comment",
            documentId: documentId,
            title: title,
            action: action,
            performedBy: user._id,
            description: `<b>${user.name}</b> ${action} a comment`,
            data: data,
        });

        

        return commentLog;
    } catch (error) {
        throw new Error(`Error creating comment log: ${error.message}`);
    }
};
