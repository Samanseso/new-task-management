import type { TaskType } from "./utils/types";

import { 
    Stack,
    Typography, 
    Skeleton
} from "@mui/material";

import Status from "./Status";
import Priority from "./Priority";
import Assignee from "./Assignee";


const TaskModalAttributes = ({ task }: {task: TaskType} ) => {
    const dateOptions: Intl.DateTimeFormatOptions = { month: 'long', day: 'numeric', year: 'numeric' };
    const startDate = new Date(task.createdAt).toLocaleDateString('en-US', dateOptions);
    const dueDate = new Date(task.dueDate).toLocaleDateString('en-US', dateOptions);

    return (
        <Stack direction="column" gap={1.5} sx={{ mb: 1 }}>
            <Stack direction="row" sx={{ justifyContent: "space-between", alignItems: "center", mb: 0.7 }}>
                <Stack direction="row" sx={{ justifyContent: "space-between", width: "40%", alignItems: "center" }}>
                    <Typography variant='body2' sx={{ width: 100, opacity: 0.7 }}>Status</Typography>
                    {task.status ? <Status text={task.status}/> : <Skeleton variant="rounded" width={75} height={24} />}
                </Stack>

                <Stack direction="row" sx={{ width: "40%", justifyContent: "space-between" }}>
                    <Typography variant='body2' sx={{ width: 100, opacity: 0.7 }}>Start Date</Typography>
                    <Typography variant='body2'>{startDate !== "Invalid Date" ? startDate : <Skeleton variant="rounded" width={75} height={22} />}</Typography>
                </Stack>  
            </Stack>  
             
            <Stack direction="row" sx={{ justifyContent: "space-between", alignItems: "center"}}>
                <Stack direction="row" sx={{ justifyContent: "space-between", alignItems: "center", width: "40%" }}>
                    <Typography variant='body2' sx={{ width: 100, opacity: 0.7 }}>Priority</Typography>
                    {task.priority ? <Priority text={task.priority}/> : <Skeleton variant="rounded" width={75} height={24} />}
                </Stack>    
                <Stack direction="row" sx={{ width: "40%", justifyContent: "space-between"}}>
                    <Typography variant='body2' sx={{ width: 100, opacity: 0.7 }}>Due Date</Typography>
                    <Typography variant='body2'>{dueDate !== "Invalid Date" ? dueDate : <Skeleton variant="rounded" width={75} height={22} />}</Typography>

                </Stack>  
            </Stack>

            <Stack direction="row" sx={{ justifyContent: "space-between", alignItems: "center"}}>
                <Stack direction="row" sx={{ width: "40%", justifyContent: "space-between", alignItems: "center"}}>
                    <Typography variant='body2' sx={{ width: 100, opacity: 0.7 }}>
                        Assigned to
                    </Typography>
                    <Assignee users={task.assignedTo} />
                </Stack> 

                <Stack direction="row" sx={{ width: "40%", justifyContent: "space-between", alignItems: "center"}}>
                    <Typography variant='body2' sx={{ width: 100, opacity: 0.7 }}>
                        Created by
                    </Typography>
                    <Assignee users={[task.createdBy]} />
                </Stack> 
            </Stack>

            
           
           
        </Stack>
    )
}

export default TaskModalAttributes