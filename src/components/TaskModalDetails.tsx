import { useTaskModal } from './context/TaskModalContext';

import { 
    Box,
    Modal,
    Stack,
} from '@mui/material';


const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '60rem',
    height: "90vh",
    bgcolor: 'background.paper',
    boxShadow: 24,
    border: 0,  
    borderRadius: 1,
    outline: 'none',
    overflow: 'hidden',
};

import TaskModalHeader from './TaskModalHeader';
import TaskModalBody from './TaskModalBody';
import TaskModalComments from './TaskModalComments';

const TaskModalDetails = () => {
    const { modalToggle, setModalToggle } = useTaskModal();



    return (
        <div>
            <Modal
                open={modalToggle}
                onClose={() => setModalToggle(false)}
            >
                <Box sx={style}>
                    <Stack direction="column">
                        <TaskModalHeader />
                        <Stack direction="row">
                            <TaskModalBody/>
                            <TaskModalComments /> 
                        </Stack>
                    </Stack>
                </Box>
            </Modal>
        </div>
    );
}

export default TaskModalDetails