import mongoose from "mongoose";

const LogSchema = new mongoose.Schema({
    entity: {
		type: String,
		required: true,
		enum: ["Task", "Subtask", "Comment", "Project", "User"]
    },
    documentId: {
		type: mongoose.Schema.Types.ObjectId,
		required: true,
    },
    title: {
		type: String,
		required: true,
    },
    action: {
		type: String,
		required: true
    },
    performedBy: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "User",
		required: true
    },
    description: {
      	type: String
    },
    data: { 
        oldValue: { type: String, default: "" }, 
        newValue: { type: String, default: "" } 
    }
  	},
  	{ timestamps: true } 
);

const Log = mongoose.model("Log", LogSchema);

export default Log;
