import { Box, Paper, Typography } from "@mui/material";
import type { LogType } from "./utils/types";
import DOMPurify from "dompurify";

interface UpdateProps {
    update: LogType;
    view: string;
}



const Update = ({ update, view }: UpdateProps) => {
    const dateOptions: Intl.DateTimeFormatOptions = { month: 'long', day: 'numeric', year: 'numeric' };
    const date = new Date(update.createdAt).toLocaleDateString('en-US', dateOptions);
    const timeOptions: Intl.DateTimeFormatOptions = { hour: '2-digit', minute: '2-digit'};
    const time = new Date(update.createdAt).toLocaleTimeString('en-US', timeOptions);
    const description = DOMPurify.sanitize(update.description)
    return (
        <Paper elevation={2} sx={{ 
			p: 0.5,
			px: view === "list" ? 2 : 2, 
			cursor: "pointer",
			borderRadius: view === "list" ? 0 : 1,
			boxShadow: view === "list" ? "none" : 1,
			backgroundColor	: view === "list" ? "transparent" : "#fff"}} 
		> 
            <Box sx={{ my: view === "list" ? 0 : 1, width: view === "list" ? "60%" : "unset" }}>
                <Typography variant='subtitle1' sx={{ fontWeight: "bold", textWrap: "nowrap" }}>{update.title}</Typography>
                <Typography variant='subtitle2' sx={{ color: "#8a8a8a", 
                    display: view === "list" ? "none" : '-webkit-box',
                    overflow: 'hidden',
                    WebkitBoxOrient: 'vertical',
                    WebkitLineClamp: 1,
                    mb: 1}}
                    dangerouslySetInnerHTML={{ __html: description }}
                />
                <Typography variant="caption" sx={{ opacity: 0.5}}>{date} at {time}</Typography>
            </Box>

		</Paper>
    )
}

export default Update