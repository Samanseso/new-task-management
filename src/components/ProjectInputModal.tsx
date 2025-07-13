
import type { SetStateAction } from "react";

import { 
    Modal, 
    Box, 
    Stack, 
} from "@mui/material";

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '60rem',
    height: "fit-content",
    bgcolor: 'background.paper',
    boxShadow: 24,
    border: 0,  
    borderRadius: 1,
    outline: 'none',
    overflow: 'hidden',
};

import ProjectInputModalHeader from "./ProjectInputModalHeader";
import ProjectInputModalDetails from "./ProjectInputModalDetails";
import ProjectInputModalAttributes from "./ProjectInputModalAttributes";
import { useForm, type SubmitHandler } from "react-hook-form";
import type { ProjectInputType } from "./utils/types";
import axios from "axios";
import { useAuth } from "./AuthContext";


const api_base_url = import.meta.env.VITE_API_BASE_URL;
const createProject = async (values: ProjectInputType) => {
    try {
        const response = await axios.post(`${api_base_url}/projects`, values);
        return response;
    } catch (error) {
        console.log(error);
        return null;
    }
}

interface ProjectInputModalProps {
    open: boolean;
    setOpen: React.Dispatch<SetStateAction<boolean>>;
}

const ProjectInputModal = ({ open, setOpen }: ProjectInputModalProps) => {
    
    const { register, setValue, handleSubmit } = useForm<ProjectInputType>();

    const userId = useAuth()?.user?._id || "";

    const doSubmit: SubmitHandler<ProjectInputType> = async (values) => {
        const response = await createProject(values);
        console.log(response);

        if (response && response.status === 200) {
            setOpen(false);
        }
    }

    return (
        <Modal
            open={open}
            onClose={() => setOpen(false)}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Box sx={style}>
                <form onSubmit={handleSubmit(doSubmit)}>
                    <Stack direction="column">
                        <ProjectInputModalHeader setOpen={setOpen}/>
                        <Stack direction="row" gap={3}>
                            <Box sx={{ flex: 0.6, m: 2, mr: 0 }}>
                                <ProjectInputModalDetails register={register} />
                            </Box>

                            <Box sx={{ flex: 0.4, m:2, ml: 0 }}>
                                <ProjectInputModalAttributes register={register} setValue={setValue} setOpen={setOpen} />
                            </Box>
                        </Stack>
                    </Stack>
                    <input type="hidden" value={userId} {...register("createdBy")} />
                </form>
            </Box>
        </Modal>
    );
}

export default ProjectInputModal