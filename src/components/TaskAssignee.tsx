import { 
    Avatar, 
    backdropClasses, 
    Stack,
    Typography,
} from '@mui/material'

import avatarImg from "../../src/assets/avatar/avatar1.jpg"

const TaskAssignee = ({ assignee } : any) => {
	return (
		<Stack gap={0.5} sx={{ backgroundColor: "#e6e8fa", p: 0.7, pr: 1.2, borderRadius: 100}}>
			<Stack direction="row" gap={1} sx={{ alignItems: "center"}}>
				<Avatar alt="Remy Sharp" src={avatarImg} sx={{ width: 30, height: 30, fontSize: 15 }} />
				<Typography variant="body2" sx={{ textWrap: "nowrap" }}>
					Evander Wines
				</Typography>
			</Stack>
		</Stack>
	)
}

export default TaskAssignee