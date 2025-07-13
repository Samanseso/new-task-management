import type { LogType } from './utils/types';
import { 
    Stack, 
} from '@mui/material';

import Status from './Status';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';

const TaskModalActivityTask = ({ log }: { log: LogType }) => { 
    
    return (
        <Stack direction="row" gap={0.7} sx={{ mt: 2, alignItems: "center" }}>
            <Status text={log.data.oldValue} />
            <NavigateNextIcon sx={{ fontSize: 20 }} />
            <Status text={log.data.newValue} />
        </Stack>
    )
}

export default TaskModalActivityTask