import type { LogType } from "./utils/types"
import { 
    Typography,
    Box,
    Divider,
    Stack,
} from "@mui/material";

import DOMPurify from "dompurify";
import TaskModalActivitySubtask from './TaskModalActivitySubtask';
import TaskModalActivityTask from './TaskModalActivityTask'
import Assignee from "./Assignee";


const TaskModalActivity = ({ log }: { log: LogType }) => {
    
    const dateOptions: Intl.DateTimeFormatOptions = { month: 'long', day: 'numeric', year: 'numeric' };
    const date = new Date(log.createdAt).toLocaleDateString('en-US', dateOptions);
    const timeOptions: Intl.DateTimeFormatOptions = { hour: '2-digit', minute: '2-digit'};
    const time = new Date(log.createdAt).toLocaleTimeString('en-US', timeOptions);
    const description = DOMPurify.sanitize(log.description);


    let component;

    switch(log.entity) {
        case "Subtask": component = <TaskModalActivitySubtask log={log}/>; break;
        case "Task": component = <TaskModalActivityTask log={log}/>; break;
    }

    return (
        <Stack direction="row" gap={2}>
            <Stack direction="column">
                <Assignee users={[ log.performedBy ] } />
                <Stack direction="row" sx={{ height: "100%" }}>
                    <Box sx={{ flex: 1 }}></Box>
                    {log.action !== "created" && <Divider orientation="vertical" variant="middle" flexItem />}
                    <Box sx={{ flex: 1 }}></Box>
                </Stack>
            </Stack>
            <Stack direction="column" sx={{ mb: 3 }}>
                <Typography variant="body2" dangerouslySetInnerHTML={{ __html: description }} />
                <Typography variant="caption" sx={{ opacity: 0.5 }}>{date} at {time}</Typography>
                {log.action !== "created" && component}
            </Stack>
        </Stack>
    )
}

export default TaskModalActivity