import type { SetStateAction } from 'react';

import { 
    Stack,
    Typography,
    Button
} from '@mui/material'

import CloseIcon from '@mui/icons-material/Close';


interface ProjectInputModalHeaderProps {
	setOpen: React.Dispatch<SetStateAction<boolean>>;
}


const ProjectInputModalHeader = ({ setOpen }: ProjectInputModalHeaderProps) => {
    

	return (
		<Stack direction="row" sx={{ 
		alignItems: "center", 
		justifyContent: 
		"space-between", 
		borderBottom: 1, 
		borderColor: "#d6d6d6", 
		p: 2, pb: 1 }}>
			<Typography id="modal-modal-title" variant="body1">
				Add Project
			</Typography>
			<Button sx={{ color: "#000" }} onClick={() => {}}>
				<CloseIcon onClick={() => setOpen(false)} />
			</Button>
		</Stack>
		
	)
}

export default ProjectInputModalHeader