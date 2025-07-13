import type { LogType } from './utils/types';


import { 
    Box,
} from '@mui/material';

import TaskModalActivity from './TaskModalActivity';



const TaskModalActivities = ({ logs }: { logs: LogType[] }) => {
    return (
        <Box sx={{ maxHeight: 230, height: 230, mt: 1, mb: 2, pr: 1,  overflow: 'auto', 
            '&::-webkit-scrollbar': {
                width: '0.4em',
            },
            '&::-webkit-scrollbar-track': {
                boxShadow: 'inset 0 0 6px rgba(0, 0, 0, 0)',
                webkitBoxShadow: 'inset 0 0 6px rgba(0,0,0, 0)'
            },
            '&::-webkit-scrollbar-thumb': {
                backgroundColor: 'rgba(0,0,0, 0.3)',
                borderRadius: 10,
                cursor: "pointer",
            }}}>

            {logs.length > 0 ? logs.map((log, logIdx) => {
                return (

                    <TaskModalActivity key={logIdx} log={log} ></TaskModalActivity>
                )
            }) : <div>Loading activities</div>}
        </Box>
          
    )
}

export default TaskModalActivities