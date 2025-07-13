import mongoose from "mongoose";

const TaskSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String },
    status: { 
        type: String, 
        enum: ['To Do', 'In Progress', 'Completed'], 
        default: 'To Do'
    },
    priority: { 
        type: String, 
        enum: ['Low', 'Medium', 'High', 'Critical'], 
        default: 'Medium'
    },
    dueDate: { type: Date },
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', },
    assignedTo: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
    projectId: { type: mongoose.Schema.Types.ObjectId, ref: 'Project' },
    subtasks: [{
        text: String,
        checked: { type: Boolean, default: false },
    }],
    comments: [{
        createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
        text: String,
        createdAt: { type: Date, default: Date.now },
        replies:  [{
            createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
            text: String,
            createdAt: { type: Date, default: Date.now }
        }]
    }]
}, { timestamps: true });

const Task = mongoose.model('Task', TaskSchema);

export default Task;
