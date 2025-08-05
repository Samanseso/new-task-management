import type { LogType } from './utils/types';
import { 
    Checkbox,
    Stack, 
    Typography
} from '@mui/material';

const TaskModalActivitySubtask = ({ log }: { log: LogType }) => { 
    const checked = (log.data.newValue === "true");

    return (
        <Stack direction="row" gap={1} sx={{ mt: 1, alignItems: "center" }}>
            <Checkbox disabled defaultChecked={checked} color="success" size='small' sx={{ 
                padding: 0, ml: -0.3, 
                '&.Mui-checked': { color: checked ? "#2e7d32" : ""}
            }}/>

            <Typography variant='body2'>{log.title}</Typography>
        </Stack>
    )
}

export default TaskModalActivitySubtask