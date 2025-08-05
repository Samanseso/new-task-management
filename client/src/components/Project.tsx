
import type { ProjectType } from './utils/types'

import {
    Box,
    Stack,
    Paper,
    Typography,
    Grid,    
	AvatarGroup,
	Avatar,
} from "@mui/material"

import Status from "./Status";

import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import MoreVertIcon from '@mui/icons-material/MoreVert';  
import { useNavigate } from 'react-router-dom';

function stringToColor(string: string) {
    let hash = 0;
    let i;

    /* eslint-disable no-bitwise */
    for (i = 0; i < string.length; i += 1) {
        hash = string.charCodeAt(i) + ((hash << 5) - hash);
    }

    let color = '#';

    for (i = 0; i < 3; i += 1) {
        const value = (hash >> (i * 8)) & 0xff;
        color += `00${value.toString(16)}`.slice(-2);
    }
    /* eslint-enable no-bitwise */

    return color;
}

function stringAvatar(name: string) {
    return {
        sx: {
			width: 30, height: 30, fontSize: 15,
            bgcolor: stringToColor(name),
        },
        children: `${name.split(' ')[0][0]}${name.split(' ')[1][0]}`,
    };
}


const Project = ({ project, view }: { view: string, project: ProjectType }) => {
	const dateOptions: Intl.DateTimeFormatOptions = { month: "long", day: "numeric", year: "numeric"};
	const dueDate = new Date(project.dueDate).toLocaleDateString("en-US", dateOptions);

	const navigate = useNavigate();

	return (
		<>
			<Grid size={{ xs: 1, sm: 4, md: 6, lg: 4 }}>
				<Paper elevation={2} sx={{ 
					p: view === "list" ? 1 : 2,
					px: view === "list" ? 2 : 2, 
					cursor: "pointer" }} 
					onClick={() => {
						navigate(`${project._id}`);
					}}> 
					<Stack direction={view === "list" ? "row" : "column"} gap={view === "list" ? 0 : 0.5} sx={{ 
						justifyContent: "space-between", alignItems: view === "list" ? "center" : "unset" }}>
						<Stack direction={view === "list" ? "row-reverse" : "column"} gap={ view === "list" ? 0.5 : 0} sx={{ 
							width: view === "list" ? "30%" : "100%", 
							justifyContent: "start" }}>
							<Stack direction='row' sx={{ mt: 0.3, alignItems: "center", justifyContent: 'space-between' }}>
								<Status text={project.status} />
								<MoreVertIcon />
							</Stack>

							<Box sx={{ my: view === "list" ? 0 : 2, width: view === "list" ? "50%" : "unset" }}>
								<Typography variant='subtitle1' sx={{ fontWeight: "bold", mr: 1, textWrap: "nowrap" }}>{project.title}</Typography>
								<Typography variant='subtitle2' sx={{ color: "#8a8a8a", 
									display: view === "list" ? "none" : '-webkit-box',
									overflow: 'hidden',
									WebkitBoxOrient: 'vertical',
									WebkitLineClamp: 1 }} >
									{project.description}
								</Typography>
							</Box>
						</Stack>

						<Stack direction={view === "list" ? "row" : "column"} gap={view === "list" ? 2 : 0} sx={{ 
							width: view === "list" ? "70%" : "100%", alignItems: view === "list" ? "center" : "unset",
							justifyContent: "space-between" }}>
							
							<Stack direction="row" gap={0.5} sx={{ width: view === "list" ? "50%" : "100%",  alignItems: "center", 
								justifyContent: view === "list" ? "end" : "space-between" }}>

								<Stack direction="row" gap={0.5} sx={{ alignItems: "center" }}>
									<CalendarMonthIcon sx={{ fontSize: 20 }} />
									<Typography variant="body2">{dueDate}</Typography>
								</Stack>
	
								
								<AvatarGroup max={6}>
									{project.members.map((member, memberIdx) => (
										<Avatar key={memberIdx}  
										{...stringAvatar(member.data.name || "Sample Name")} />
									))}
								</AvatarGroup>
							</Stack>
						</Stack>
					</Stack>

					
				</Paper>
			</Grid>
		</>
	)
}

export default Project