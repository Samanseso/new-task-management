import type { UseFormRegister, UseFormSetValue } from 'react-hook-form';
import { useEffect, useState } from 'react';
import type { InputTaskType } from './utils/types';

import { 
    Box,
    Button,
    Typography,
    TextField,
    Stack,
    Checkbox
} from '@mui/material';

import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';



interface TaskInputSubTasksProps {
    register: UseFormRegister<InputTaskType>;
    setValue: UseFormSetValue<InputTaskType>;
}

const TaskInputSubTasks = ({ register, setValue }: TaskInputSubTasksProps) => {
    const [subtaskList, setSubtaskList] = useState<{ text: string, checked: boolean }[]>([]);
    const [inputSubtask, setInputSubtask] = useState(false);

    const [subtask, setSubtask]  = useState("");

    useEffect(() => {
        register("subtasks");
        setValue("subtasks", subtaskList);
    }, [subtaskList]);

    return (
        <Box>
            <Typography variant='body2' sx={{ mb: 2 }}>Subtasks</Typography>

            <Stack direction="column">
                {subtaskList.length > 0 &&
                    subtaskList.map((subtask, subtaskIdx) => {
                        return (
                            <Stack key={subtaskIdx} direction="row" sx={{ alignItems: "center", justifyContent: "space-between"}}>
                                <Stack direction="row" gap={1} sx={{ alignItems: "center" }}>
                                    <Checkbox color="success" size="small" value={subtask.checked} onChange={() => {
                                        setSubtaskList(subtaskList => [...subtaskList.filter((_, index) => index != subtaskIdx), {
                                            text: subtask.text,
                                            checked: !subtask.checked,
                                        }])
                                    }} />
                                    <Typography>{subtask.text}</Typography>
                                </Stack>

                                <Stack direction="row" gap={2} sx={{ alignItems: "center" }}>
                                    <EditIcon sx={{ fontSize: 21, cursor: "pointer" }} />
                                    <DeleteIcon sx={{ fontSize: 24, color: "#ff5842", cursor: "pointer"  }} />
                                </Stack>
                            </Stack>
                        );
                    })
                
                }

                {inputSubtask &&
                    <TextField id="outlined-basic" label="Enter subtask" variant="outlined" sx={{ mb: 1 }} 
                    onChange={(e) => {
                        setSubtask(e.target.value);
                    }}/>
                }

                {inputSubtask ?
                    <Stack direction="row">
                        <Button sx={{ textTransform: "none", color: "#000", width: "fit-content" }} 
                            onClick={() => {
                                setInputSubtask(false);
                                setSubtask("");
                            }}>
                            Discard
                        </Button>

                        <Button sx={{ textTransform: "none", width: "fit-content" }} 
                            onClick={() => {
                                setInputSubtask(false);
                                subtask !== "" && setSubtaskList([...subtaskList, { text: subtask, checked: false }])
                                setSubtask("");
                            }}>

                            Save
                        </Button>
                    </Stack> :

                    <Button variant='outlined' endIcon={<AddIcon />} sx={{ textTransform: "none", width: "fit-content" }} 
                        onClick={() => setInputSubtask(true)}>
                        Add Subtask
                    </Button>
                }


                
            </Stack>
        </Box>
    )
}

export default TaskInputSubTasks