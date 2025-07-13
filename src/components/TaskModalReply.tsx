import {
  	Box,
	Stack,
	Avatar,
	Typography
} from '@mui/material';

interface ReplyType {
    createdBy: { 
        _id: string; 
        name: string; 
        email: string;	
    }; 
    text: String;
    createdAt: string;
    _id: string;
}

import { getRelativeTimeDifference } from '../helper';
import avatarImg from "../../src/assets/avatar/avatar1.jpg"


const TaskModalReply = ({ reply, isLast }: { reply: ReplyType, isLast: boolean }) => {
  	const relativeTimeDifference = getRelativeTimeDifference(reply.createdAt);

	return (
		<Stack direction="row">
			{<Box sx={{ flex: 1, maxWidth: "22px", width: "22px", minWidth: "22px", 
				borderLeft: !isLast ? 2 : 0, ml: "15px",
				borderColor: "#ccc", position: "relative" }} >
				{!isLast &&
					<Box sx={{ width: "100%", height: "10%", borderBottom: 2, borderLeft: 2, 
						borderBottomLeftRadius: 10, borderColor: "#ccc", position: "absolute", left: "-1.7px", bottom: "-15px"}}>
					</Box>
				}
			</Box>
			}
			<Box sx={{ mb: 2, width: "fit-content" }}>
				<Stack direction="row" gap={1} sx={{ alignItems: "center", mb: 1 }}>
					<Avatar src={avatarImg} sx={{ width: 30, height: 30 }} />
					<Typography variant='body2'>{reply.createdBy.name}</Typography>	
					<Typography variant='h6' sx={{ fontWeight: "bold"}}>&middot;</Typography>	
					<Typography variant='body2'>{relativeTimeDifference}</Typography>	
				</Stack>
				<Typography variant='body2' sx={{ mb: 1, p: 1, backgroundColor: "#ededed", borderRadius: 2, ml: "37px", pl: 1 }}>
					{reply.text}
				</Typography>	
				<Stack direction="row" gap={2} sx={{ ml: "37px", pl: 1 }}>
					<Typography variant='body2' sx={{ cursor: "pointer"}}>Like</Typography>
				</Stack>
				
			</Box>
		</Stack>
	)
}

export default TaskModalReply