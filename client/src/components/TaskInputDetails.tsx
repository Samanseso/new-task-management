
import { Typography, TextField } from "@mui/material";
import { useEffect, useState } from "react";
import type { UseFormRegister } from "react-hook-form";
import type { InputTaskType } from "./utils/types";

interface TaskInputDetailsProps {
    register: UseFormRegister<InputTaskType>;
    titleError: string;
}

const TaskInputDetails = ({ register, titleError } : TaskInputDetailsProps) => {
    const [currentTitleError, setCurrentTItleError] = useState("");

    useEffect(() => {
        setCurrentTItleError(titleError);
    }, [titleError]);
    
    return (    
        <>
            <Typography variant="body2" sx={{ mb: 1 }}>
                Title
            </Typography>
            <TextField
                error={ currentTitleError != "" }
                sx={{ mb: 2 }}
                id="task-title"
                placeholder="Enter task title"
                variant="outlined"
                {...register("title")}
                helperText={currentTitleError}
                onChange={() => {
                    setCurrentTItleError("");
                }}
            />

            <Typography variant="body2" sx={{ mb: 1 }}>
                Description
            </Typography>
            <TextField
                id="outlined-multiline-static"
                placeholder="Enter task description"
                multiline
                rows={3}
                {...register("description")}
            />
        </>
    );
};

export default TaskInputDetails;
