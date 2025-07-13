import React, { useState, type SetStateAction } from 'react'

import { 
    Modal, 
    Box, 
    Stack,
    Button,
} from "@mui/material";
import axios from 'axios';
import { useForm, type SubmitHandler } from 'react-hook-form';
import type { InputTaskType } from './utils/types';
import TaskInputDetails from './TaskInputDetails';
import TaskInputSubTasks from './TaskInputSubTasks';
import TaskInputAttributes from './TaskInputAttributes';
import TaskInputModalHeader from './TaskInputModalHeader';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '60rem',
    height: "80vh",
    bgcolor: 'background.paper',
    boxShadow: 24,
    border: 0,  
    borderRadius: 1,
    outline: 'none',
    overflow: 'hidden',
};

interface TaskInputModalProps {
    inputModalToggle: boolean;
    setInputModalToggle: React.Dispatch<SetStateAction<boolean>>;
    projectId: string;
}

const api_base_url = import.meta.env.VITE_API_BASE_URL;
const createTask = async (values : InputTaskType) => {
	const response = await axios
		.post(`${api_base_url}/tasks`, values)
		.then(response => response)
		.catch(error => error.response.data.error);
	return response;
}

const TaskInputModal = ({ inputModalToggle, setInputModalToggle, projectId }: TaskInputModalProps) => {

    const { register, handleSubmit, setValue } = useForm<InputTaskType>();

    const [titleInputError, setTitleInputError] = useState("");




    const doSubmit: SubmitHandler<InputTaskType> = (values) => {
        setTitleInputError("");


        if (!values.title) {
            setTitleInputError("Title is required");
        }

        

        createTask(values)
        .then(response => {
            console.log(response)
        });
    };

    return (
        <Modal
            open={inputModalToggle}
            onClose={() => setInputModalToggle(false)}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Box sx={style}>
                <form onSubmit={handleSubmit(doSubmit)}>
                    <Stack direction="column" sx={{ height: "80vh" }}>
                        <TaskInputModalHeader />
                        <Stack direction="row" gap={2} sx={{ height: "100%" }}>
                            <Stack direction="column" sx={{ flex: 1, minWidth: 300, m: 2, mr: 0}}>
                                <TaskInputDetails 
                                    register={register} 
                                    titleError={titleInputError}/>

                                <Box sx={{ flex: 1 , mt: 2 }}>
                                    <TaskInputSubTasks register={register} setValue={setValue} />
                                </Box>
                            
                            </Stack>
                           
                            <Stack direction="column" gap={3} sx={{ flex: 0.4, m: 2, ml: 0, p: 2, backgroundColor: "#f2f2f2", borderRadius: 2 }}>
                                <TaskInputAttributes 
                                    register={register} 
                                    setValue={setValue}/>
                                
                                <input type="hidden" value={projectId} {...register("projectId")} />
                                <input type="hidden" value={"To Do"} {...register("status")} />
        
                                <Box sx={{ flex: 1 }}></Box>
                                <Stack direction="row" gap={1}>
                                    <Button
                                        variant="outlined"
                                        sx={{ flex: 1, px: 6 }}	
                                        onClick={() => setInputModalToggle(false)}>
                                        Cancel
                                    </Button>
                                    <Button 
                                        type="submit" 
                                        variant="contained" 
                                        sx={{ flex: 1, px: 6 }}>
                                        Create
                                    </Button>
                                </Stack>
                            </Stack>
                        </Stack>
                    </Stack>
                </form>
            </Box>
        </Modal>
    )
}

export default TaskInputModal