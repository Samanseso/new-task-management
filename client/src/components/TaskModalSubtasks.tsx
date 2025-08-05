import type { SubtaskType, SubtasksStatusType} from "./utils/types";
import { useEffect, useState } from "react";
import { useAuth } from "./AuthContext";
import { useParams } from "react-router-dom";

import {
    Checkbox, 
    Stack,
    Typography,
    Box,
    styled
} from "@mui/material"

import axios from "axios";

import LinearProgress, { linearProgressClasses } from '@mui/material/LinearProgress';
import { useTaskList } from "./context/TaskListContext";
import { useTaskModal } from "./context/TaskModalContext";

const BorderLinearProgress = styled(LinearProgress)(({ theme }) => ({
    height: 10,
    borderRadius: 5,
    [`&.${linearProgressClasses.colorPrimary}`]: {
        backgroundColor: theme.palette.grey[200],
        ...theme.applyStyles('dark', {
        backgroundColor: theme.palette.grey[800],
        }),
    },
    [`& .${linearProgressClasses.bar}`]: {
        borderRadius: 5,
        backgroundColor: '#1a90ff',
        ...theme.applyStyles('dark', {
        backgroundColor: '#308fe8',
        }),
    },
}));

const api_base_url = import.meta.env.VITE_API_BASE_URL;

const updateSubtask = async (
        taskId : string, 
        subtaskId : string, 
        values: { title : string, checked: boolean, updatedBy: string }
    ): Promise<SubtaskType[]> => {

    const response = await axios
    .patch(`${api_base_url}/tasks/${taskId}/subtask/${subtaskId}`, values)
    .then(response => response.data.subtasks)
    .catch(error => error.respose.data.error);

    return response;
}


const TaskModalSubtasks = () => {

    const [ subtasks, setStubtasks] = useState<SubtaskType[]>([]);

    const [ subtasksStatus, setSubtasksStatus ] = useState<SubtasksStatusType>({
            total: 0,
            completed: 0,
            percent: 0
    });

    const user = useAuth()?.user?._id || "";
    const params = useParams();
    const projectId = params.id || "";
    const { loadTaskList } = useTaskList();
    const { task, loadModalTask } = useTaskModal();

    useEffect(() => {
        setStubtasks(task.subtasks);
        setSubtasksStatus({
            total: task.subtasks.length,
            completed: task.subtasks.filter(subtask => subtask.checked === true).length,
            percent: task.subtasks.filter(subtask => subtask.checked === true).length / task.subtasks.length * 100
        });
    }, [task]);
    
    return (
        <Stack direction="column" sx={{ height: 220,  minHeight: 220, overflow: "auto" }}>
            <Box sx={{ my: 1 }}>
                <Stack direction="row" sx={{ justifyContent: "space-between" }}>
                    <Typography variant='body2' sx={{ mb: 1 }}>Progress</Typography>
                    <Typography variant='body2' sx={{ mb: 1 }}>{subtasksStatus.completed}/{subtasksStatus.total}</Typography>
                </Stack>
                <BorderLinearProgress variant="determinate" value={subtasksStatus.percent} />
            </Box>
            {subtasks.map((subtask, subtaskIdx) => (
                <Stack key={subtaskIdx} direction="row" sx={{ alignItems: "center" }}>
                    <Checkbox color="success" size="small" checked={subtask.checked} onChange={(_, value) => {
                        const values = {
                            title : subtask.text, 
                            checked: value,
                            updatedBy: user
                        }

                        updateSubtask(task._id, subtask._id, values)
                        .then(response => {                            
                            setSubtasksStatus({
                                total: response.length,
                                completed: response.filter(subtask => subtask.checked === true).length,
                                percent: response.filter(subtask => subtask.checked === true).length / response.length * 100
                            });
                            loadModalTask(task._id);
                            loadTaskList(projectId);
                        });
                    }} /> 
                    <Typography variant="body2">{subtask.text}</Typography>
                </Stack>
            ))}
        </Stack>
    )
}

export default TaskModalSubtasks