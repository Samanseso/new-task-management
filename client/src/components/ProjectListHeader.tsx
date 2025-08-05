import { useState } from "react";

import {
    Typography,
    Stack,
    Button,
} from "@mui/material"

import AddIcon from '@mui/icons-material/Add';
import ProjectInputModal from "./ProjectInputModal";

const ProjectListHeader = () => {

    const [open, setOpen] = useState(false);

    return (
        <Stack sx={{ 
            p: 1, 
            flexDirection: {xs: "column", sm: "row"},
            alignItems: "center", 
            justifyContent: "space-between" }}>
            <Stack direction="row" sx={{ alignSelf: "start", mb: { xs: 2, sm: 0 }, alignItems: "center" }}>
                <Typography variant="h6">
                    Projects
                </Typography>
                
            </Stack>
            <Stack direction="row" gap={1} sx={{ width: { xs: "100%", sm: "fit-content" }, justifyContent: "space-between" }}>
                <Button variant="contained" endIcon={<AddIcon />} onClick={() => setOpen(true)}>
                    Add Project
                </Button>
            </Stack>

            <ProjectInputModal open={open} setOpen={setOpen} />
        </Stack>
    )
}

export default ProjectListHeader