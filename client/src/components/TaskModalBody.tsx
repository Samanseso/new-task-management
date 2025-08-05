
import { 
    Box,
    Typography,
    Stack,
    Skeleton
} from '@mui/material';

import TaskModalAttributes from './TaskModalAttributes';
import TaskModalTabs from './TaskModalTabs';
import { useTaskModal } from './context/TaskModalContext';

const TaskModalBody = () => {

    const { task } = useTaskModal();

    return (
        <Box sx={{ flex: 1, borderRight: 1, borderColor: "#d6d6d6" }}>
            <Stack direction="column" sx={{ p: 2.6 }}>
                <Typography variant='h5' sx={{ mb: 2, fontWeight: "bold"}}>
                    {task.title ? task.title : <Skeleton variant="rounded" width={210} height={29} />}
                </Typography>
                <Typography variant='body2' sx={{ mb: 4, opacity: 0.7, display: '-webkit-box',
                    overflow: 'hidden',
                    WebkitBoxOrient: 'vertical',
                    WebkitLineClamp: 3, }}>

                    {task.description ? task.description : <Skeleton variant="text" sx={{ fontSize: '1rem' }} />}
                </Typography>
                <TaskModalAttributes task={task} />

                <TaskModalTabs />
            </Stack>
        </Box>
    )
}

export default TaskModalBody