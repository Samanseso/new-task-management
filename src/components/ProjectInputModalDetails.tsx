import { 
    Box, 
    Typography,
    TextField,
} from "@mui/material";
import type { UseFormRegister } from "react-hook-form";
import type { ProjectInputType } from "./utils/types";

interface ProjectInputModalDetailsProps {
    register: UseFormRegister<ProjectInputType>;
}

const ProjectInputModalDetails = ({ register }: ProjectInputModalDetailsProps) => {
  return (
    <Box>
        <Typography variant="body2" sx={{ mb: 1 }}>
            Title
        </Typography>
        <TextField
            sx={{ mb: 2, width: "100%" }}
            id="task-title"
            placeholder="Enter project title"
            variant="outlined"
            {...register("title")}
        />

        <Typography variant="body2" sx={{ mb: 1 }}>
            Description
        </Typography>
        <TextField
            sx={{ width: "100%"}}
            id="outlined-multiline-static"
            placeholder="Enter project description"
            multiline
            rows={6}
            {...register("description")}
        />
    </Box>
  )
}

export default ProjectInputModalDetails