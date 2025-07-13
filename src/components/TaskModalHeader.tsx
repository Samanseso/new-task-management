
import { 
    Stack,
    Typography,
    Button
} from '@mui/material'

import CloseIcon from '@mui/icons-material/Close';
import { useTaskModal } from './context/TaskModalContext';


const TaskModalHeader = ( ) => {

	const { setModalToggle } = useTaskModal()

	return (
		<Stack direction="row" sx={{ 
		alignItems: "center", 
		justifyContent: 
		"space-between", 
		borderBottom: 1, 
		borderColor: "#d6d6d6", 
		p: 2, pb: 1 }}>
			<Typography id="modal-modal-title" variant="body1">
				Task Details
			</Typography>
			<Button sx={{ color: "#000" }} onClick={() => {setModalToggle(false)}}>
				<CloseIcon />
			</Button>
		</Stack>
		
	)
}

export default TaskModalHeader