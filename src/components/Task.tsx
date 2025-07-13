import type { TaskType } from "./utils/types";

import {
    Box,
    Stack,
    Paper,
    Typography,
    styled,
} from "@mui/material"

import Status from "./Status";
import Priority from "./Priority";

import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import LinearProgress, { linearProgressClasses } from '@mui/material/LinearProgress';
import { useTaskModal } from "./context/TaskModalContext";
import Assignee from "./Assignee";



const BorderLinearProgress = styled(LinearProgress)(({ theme }) => ({
    height: 10,
    borderRadius: 5,
    [`&.${linearProgressClasses.colorPrimary}`]: {
        backgroundColor: theme.palette.grey[200],
        ...theme.applyStyles('dark', {
        backgroundColor: theme.palette.grey[800],
        }),
    },
    [`& .${linearProgressClasses.bar}`]: {
        borderRadius: 5,
        backgroundColor: '#1a90ff',
        ...theme.applyStyles('dark', {
        backgroundColor: '#308fe8',
        }),
    },
}));


interface TaskProps {
	task: TaskType;
	view: string;
}


const Task = ({ task, view } : TaskProps) => {
	const { setModalToggle, loadModalTask} = useTaskModal();


	const subtasksStatus = {
		total: task.subtasks.length,
		completed: task.subtasks.filter(subtask => subtask.checked === true).length,
		percent: task.subtasks.filter(subtask => subtask.checked === true).length / task.subtasks.length * 100
	};

	const dateOptions: Intl.DateTimeFormatOptions = { month: 'long', day: 'numeric', year: 'numeric' };
    const dueDate = new Date(task.dueDate).toLocaleDateString('en-US', dateOptions);
	

	return (
		<Paper elevation={2} sx={{ 
			p: view === "list" ? 1 : 2,
			px: view === "list" ? 2 : 2, 
			cursor: "pointer",
			borderRadius: view === "list" ? 0 : 1,
			boxShadow: view === "list" ? "none" : 1,
			backgroundColor	: view === "list" ? "transparent" : "#fff"}} 

			onClick={() => {
				loadModalTask(task._id)
				setModalToggle(true);
			}}
		> 
			<Stack direction={view === "list" ? "row" : "column"} gap={view === "list" ? 0 : 0.5} sx={{ 
				justifyContent: "space-between", alignItems: view === "list" ? "center" : "unset" }}>
				<Stack direction={view === "list" ? "row-reverse" : "column"} gap={ view === "list" ? 0.5 : 0} sx={{ 
					width: view === "list" ? "40%" : "100%", 
					justifyContent: "start" }}>
					<Stack direction='row' gap={1} sx={{ mt: 0.3 }}>
						<Status text={task.status} />
						<Priority text={task.priority} />
					</Stack>

					<Box sx={{ my: view === "list" ? 0 : 2, width: view === "list" ? "60%" : "unset" }}>
						<Typography variant='subtitle1' sx={{ fontWeight: "bold", textWrap: "nowrap" }}>{task.title}</Typography>
						<Typography variant='subtitle2' sx={{ color: "#8a8a8a", 
							display: view === "list" ? "none" : '-webkit-box',
							overflow: 'hidden',
							WebkitBoxOrient: 'vertical',
							WebkitLineClamp: 1 }} >
							{task.description}
						</Typography>
					</Box>
				</Stack>

					
					
				<Stack direction="row" sx={{ width: view === "list" ? "60%" : "100%",  alignItems: "center", 
					justifyContent: "space-between", flexWrap: view === "list" ? "nowrap" : "wrap" }}>

					<Stack direction="column" sx={{ width: view === "list" ? "50%" : "100%" }}>
						<Stack direction="row" sx={{ justifyContent: "space-between", mb: 0.5 }}>
							<Typography variant='body2'>Progress</Typography>
							<Typography variant='body2'>{subtasksStatus.completed}/{subtasksStatus.total}</Typography>
						</Stack>
						<BorderLinearProgress variant="determinate" value={subtasksStatus.percent}  sx={{ 
							mb: view === "list" ? 0 : 2
						}} />
					</Stack>

					<Stack direction="row" gap={0.5} sx={{ width: "12%", alignItems: "center" }}>
						<CalendarMonthIcon sx={{ fontSize: 18 }} />
						<Typography variant="body2" sx={{ textWrap: "nowrap" }}>{dueDate}</Typography>
					</Stack>
					
					<Box sx={{ width: "12%" }}>
						<Assignee users={task.assignedTo} />
					</Box>
				</Stack>
			</Stack>
		</Paper>

	)
}

export default Task