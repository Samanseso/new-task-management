import mongoose from "mongoose";

const ProjectSchema = mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String },
    createdBy : { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    members: [{ 
        data: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
        assignedAt: { type: Date, default: Date.now },
        assignedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
    }], 
    status: { 
        type: String, 
        enum: ['To Do', 'In Progress', 'Paused', 'BackLog', 'Done', 'Archived'], 
        default: 'To Do'
    },

    dueDate: { type: Date },
    
}, { timestamps : true})

const Project = mongoose.model("Project", ProjectSchema);

export default Project;