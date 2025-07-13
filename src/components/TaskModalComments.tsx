import { useForm } from "react-hook-form";
import type { SubmitHandler } from "react-hook-form";
import { useAuth } from "./AuthContext";
import { useState, useRef, useEffect } from "react";
import type { CommentType } from "./utils/types";
import { useTaskModal } from "./context/TaskModalContext";

import { 
	Box,
	Stack,
	TextField,
	Button,
	Typography
} from "@mui/material"

import SendIcon from '@mui/icons-material/Send';
import TaskModalComment from "./TaskModalComment";
import axios from "axios";

const api_base_url = import.meta.env.VITE_API_BASE_URL;

const addComment = async (taskId : string, values: any): Promise<CommentType[]> => {
	console.log(values);
    const response = await axios.patch(`${api_base_url}/tasks/${taskId}/comment`, values)
    .then(response => {
        return response.data.comments;
    })
    .catch(error => {
		console.log(error)
        return error;
    });

    return response;
}

const addReply = async (taskId : string, commentId: string, values: any): Promise<CommentType[]> => {
    const response = await axios.patch(`${api_base_url}/tasks/${taskId}/comment/${commentId}/reply`, values)
    .then(response => {
        return response.data.comments;
    })
    .catch(error => {
        return error;
    });

    return response;
}

const TaskModalComments = () => {

	const [ comments, setComments ] = useState<CommentType[]>([]);

	const { task } = useTaskModal();

	const { register, handleSubmit } = useForm<CommentType>();

	const [ commentValue, setCommentValue ] = useState("");

	const [ isReplying, setIsReplying ] = useState(false);
	const [ replyName, setReplyName ] = useState("");
	const [ replyCommentId, setReplyCommentId ] = useState("");

	const user = useAuth()?.user;
	const { loadModalTask } = useTaskModal();

	useEffect(() => {
		setComments(task.comments.sort((a, b) => 
			new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
		));
	}, [task]);

	

	const commentBoxRef = useRef<HTMLDivElement>(null);

	const doInputReply = (isReply: boolean, commentId: string, name: string) => {
		setIsReplying(isReply);
		setReplyName(name);
		setReplyCommentId(commentId);
	}

	

	

	const onSubmit: SubmitHandler<CommentType> = async (values) => {
		
		if (isReplying) {
			await addReply(task._id, replyCommentId, values)
			.then(response => {
				setComments(response.sort((a, b) => 
    				new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
				));
			});
		}
		else {
			await addComment(task._id, values)
			.then(response => {
				setComments(response.sort((a, b) => 
    				new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
				));
			});

			if (commentBoxRef.current) {
				commentBoxRef.current.scrollTo({ top: 0, behavior: "smooth" });
			}
		}

		loadModalTask(task._id)
		setIsReplying(false);
		setCommentValue("");	
	}

	return (
		<Box sx={{ flex: 0.7, p: 2 }}>
			<Typography variant='body2' sx={{ mb: 2 }}>Comments</Typography>
			<Box ref={commentBoxRef} sx={{ maxHeight: 460, height: 460, mt: 1, mb: 1.5, pr: 1,  overflow: 'auto', 
				'&::-webkit-scrollbar': {
					width: '0.4em',
				},
				'&::-webkit-scrollbar-track': {
					boxShadow: 'inset 0 0 6px rgba(0, 0, 0, 0)',
					webkitBoxShadow: 'inset 0 0 6px rgba(0,0,0, 0)'
				},
				'&::-webkit-scrollbar-thumb': {
					backgroundColor: 'rgba(0,0,0, 0.3)',
					borderRadius: 10,
					cursor: "pointer",
				}}}>
				
				{comments.length > 0 ?
					comments.map((comment, commentIdx) => (
						<TaskModalComment 
							key={commentIdx} 
							comment={comment} 
							replyingTo={replyCommentId} 
							doInputReply={doInputReply} 
							isReplying={isReplying}
						/>
					)) : <Typography variant="body2">No comments yet</Typography>
				}
			</Box>
			<form onSubmit={handleSubmit(onSubmit)}>
				<Stack direction="row" sx={{ p: 1, backgroundColor: "#ededed", borderRadius: 2 }}>
					<TextField
						sx={{ flex: 1, "& .MuiInputBase-input": { p: 1 }, "& fieldset": { border: 'none', p: 0 } }}
						id="outlined-multiline-static"
						{...register("text", {
							onChange: (e) => setCommentValue(e.target.value),
						})}
						value={commentValue}	
						placeholder={ isReplying ? `Replying to ${replyName}` : "Write a comment" }
						
					/>
					<input type="hidden" value={user ? user._id : ""} {...register("createdBy")}/>	
					<Button type="submit" variant="contained" endIcon={<SendIcon/>} sx={{ textTransform: "none"}}>Send</Button>
				</Stack>
			</form>
		</Box>
	)
}

export default TaskModalComments