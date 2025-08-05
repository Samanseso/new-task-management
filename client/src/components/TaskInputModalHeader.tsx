import { Stack, Typography, Button } from '@mui/material'

import CloseIcon from '@mui/icons-material/Close';

const TaskInputModalHeader = () => {
  return (
    <Stack direction="row" sx={{ 
		alignItems: "center", 
		justifyContent: 
		"space-between", 
		borderBottom: 1, 
		borderColor: "#d6d6d6", 
		p: 2, pb: 1 }}>
        <Typography id="modal-modal-title" variant="body1">
            Add Task
        </Typography>
        <Button sx={{ color: "#000" }} onClick={() => {}}>
            <CloseIcon />
        </Button>
	</Stack>
  )
}

export default TaskInputModalHeader