import type { CommentType } from './utils/types';
import { useState } from 'react';
import {
  	Box,
	Stack,
	Avatar,
	Typography,
} from '@mui/material';

import { getRelativeTimeDifference } from '../helper';
import avatarImg from "../../src/assets/avatar/avatar1.jpg"
import TaskModalReply from './TaskModalReply';

interface TaskModalCommentProps {
  	comment: CommentType;
	isReplying: boolean;
	replyingTo: string;
	doInputReply: (isReply: boolean, commentId: string, name: string) => void;
}


const TaskModalComment = ({ comment, isReplying, replyingTo, doInputReply }: TaskModalCommentProps ) => {
	const relativeTimeDifference = getRelativeTimeDifference(comment.createdAt);
	const [showReplies, setShowReplies] = useState(false);

	

	return (
		<Box>
			<Stack direction="row" gap={1} sx={{ alignItems: "center", mb: 1 }}>
				<Avatar src={avatarImg} sx={{ width: 30, height: 30 }} />
				<Typography variant='body2'>{comment.createdBy?.name ?? "Test"}</Typography>
				<Typography variant='h6' sx={{ fontWeight: "bold"}}>&middot;</Typography>	
				<Typography variant='body2'>{relativeTimeDifference}</Typography>	
			</Stack>
			<Stack direction="row">

				<Box sx={{ flex: 1, maxWidth: "22px", width: "22px", minWidth: "22px",
					borderLeft: comment.replies.length > 0 ? 2 : 0, ml: "15px",
					borderColor: "#ccc", position: "relative" }}>
					{comment.replies.length > 0 &&
						<Box sx={{ width: "100%", height: "20%", borderBottom: 2, borderLeft: 2, 
							borderBottomLeftRadius: 10, borderColor: "#ccc", position: "absolute", left: "-1.7px", bottom: "-15px"}}>
						</Box>
					}
				</Box>
				
				<Box>
					<Typography variant='body2' sx={{ mb: 1, p: 1, backgroundColor: "#ededed", borderRadius: 2, width: "fit-content" }}>
						{comment.text}
					</Typography>	
					
					<Stack direction="row" gap={2} sx={{ mb: showReplies ? 3 : 1.5 }}>
						<Typography variant='body2' sx={{ cursor: "pointer"}}>Like</Typography>
						<Typography variant='body2' sx={{ cursor: "pointer"}} onClick={() => {
							doInputReply( !isReplying, comment._id, comment.createdBy.name);
						}}>{isReplying && replyingTo == comment._id ? "Cancel" : "Reply"}</Typography>
					</Stack>
				</Box>
			</Stack>

			{comment.replies.length > 0 && 
			(showReplies ? comment.replies.map((reply, replyIdx) =>  
				<TaskModalReply key={replyIdx} reply={reply} isLast={replyIdx === comment.replies.length - 1}></TaskModalReply>
			) : 
			<Typography variant='body2' sx={{ ml: "43px", mt: 0.3, mb: 3, fontWeight: "bold", cursor: "pointer" }} 
				onClick={() => setShowReplies(true)}>
				{comment.replies.length > 1 ? `View all ${comment.replies.length} replies` : "View 1 reply"}
			</Typography>)}			
		</Box>
	)
}

export default TaskModalComment