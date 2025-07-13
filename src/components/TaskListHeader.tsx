import {
    Typography,
    Stack,
    Button,
} from "@mui/material"

import AddIcon from '@mui/icons-material/Add';
import { useState } from "react";
import TaskInputModal from "./TaskInputModal";

interface Props {
	title: string,
	projectId: string
}

const TaskListHeader = ({ title, projectId } : Props) => {
    const [inputModalToggle, setInputModalToggle] = useState(false);
    
    return (
        <Stack sx={{ 
            p: 1, 
            flexDirection: {xs: "column", sm: "row"},
            alignItems: "center", 
            justifyContent: "space-between" }}>
            <Stack direction="row" sx={{ alignSelf: "start", mb: { xs: 2, sm: 0 }, alignItems: "center" }}>
                <Typography variant="h6">
                    {title}
                </Typography>
                
            </Stack>
            <Stack direction="row" gap={1} sx={{ width: { xs: "100%", sm: "fit-content" }, justifyContent: "space-between" }}>
                <Button variant="contained" endIcon={<AddIcon />} onClick={() => setInputModalToggle(true)}>
                    Add Task
                </Button>
            </Stack>

            <TaskInputModal inputModalToggle={inputModalToggle} setInputModalToggle={setInputModalToggle} projectId={projectId}/>
        </Stack>
    )
}

export default TaskListHeader