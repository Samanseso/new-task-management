import { Box, Stack, Tabs, Tab, Typography, Button } from "@mui/material";
import Searchbar from "./Searchbar";
import TabLabel from "./TabLabel";
import TaskListView from "./TaskListView";
import type { LogType } from "./utils/types"
import { useEffect, useState } from "react";

import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import UpdateListTabPanel from "./UpdateListTabPanel";


interface UpdatesListProps {
    updates: LogType[];
}

function a11yProps(index: number) {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`,
    };
}

const UpdatesList = ({ updates }: UpdatesListProps) => {

    const [allUpdates, setAllUpdates] = useState<LogType[]>(updates);
    const [taskUpdates, setTaskUpdates] = useState<LogType[]>([]);
    const [subtaskUpdates, setSubtaskUpdates] = useState<LogType[]>([]);
    const [commentUpdates, setCommentUpdates] = useState<LogType[]>([]);
    const [projectUpdates, setProjectUpdates] = useState<LogType[]>([]);    
    const [userUpdates, setUserUpdates] = useState<LogType[]>([]);
    const [view, setView] = useState(sessionStorage.getItem("view") || "grid");
    const [tab, setTab] = useState(0);

    useEffect(() => {
        setAllUpdates(updates);
        setTaskUpdates(updates.filter(update => update.entity === "Task"));
        setSubtaskUpdates(updates.filter(update => update.entity === "Subtask"));
        setCommentUpdates(updates.filter(update => update.entity === "Comment"));
        setProjectUpdates(updates.filter(update => update.entity === "Project"));
        setUserUpdates(updates.filter(update => update.entity === "User"));

        console.log("All updates:", allUpdates);
        console.log("Task updates:", taskUpdates);
        console.log("Subtask updates:", subtaskUpdates);
        console.log("Comment updates:", commentUpdates);
        console.log("Project updates:", projectUpdates);
        console.log("User updates:", userUpdates);

    }, [updates]);
    
    const handleChange = (_: React.SyntheticEvent, newValue: number) => {
        setTab(newValue);
    };

    return (
        <Box sx={{ px: 1 }}>
            <Stack direction="row" sx={{ justifyContent: "space-between", mb: 0.5}}>
                <Box sx={{ backgroundColor: "#d9d9d9", p: 0.4, borderRadius: 1,  "& .MuiTab-root": { borderRadius: 1, padding: 1, minHeight: "fit-content" }, "& .MuiTabs-root": { minHeight: "fit-content" } }}>
                    <Tabs sx={{  "& .MuiTabs-indicator": { height: "100%", backgroundColor: "#fff", borderRadius: 1 } }} value={tab} onChange={handleChange} aria-label="basic tabs example">
                        <Tab label={<TabLabel text={"All"} count={allUpdates.length} />} sx={{ textTransform: "none" }} {...a11yProps(0)} />
                        <Tab label={<TabLabel text={"Task"} count={taskUpdates.length} />} sx={{ textTransform: "none" }} {...a11yProps(1)} />
                        <Tab label={<TabLabel text={"Subtask"} count={subtaskUpdates.length} />} sx={{ textTransform: "none" }} {...a11yProps(2)} />
                        <Tab label={<TabLabel text={"Comment"} count={commentUpdates.length} />} sx={{ textTransform: "none" }} {...a11yProps(3)} />
                        <Tab label={<TabLabel text={"Project"} count={projectUpdates.length} />} sx={{ textTransform: "none" }} {...a11yProps(4)} />
                        <Tab label={<TabLabel text={"User"} count={userUpdates.length} />} sx={{ textTransform: "none" }} {...a11yProps(5)} />
                    </Tabs>
                </Box>

                <Stack direction="row" gap={1} sx={{ alignItems: "center" }}>
                    <Stack direction="row" gap={1} sx={{ alignItems: "center" }}>
                        <Typography variant="body2">
                            Sort by
                        </Typography>
                        <Button sx={{ textTransform: 'none', color: "#000", backgroundColor: "#fff", border: "1px solid rgba(0, 0, 0, 0.12);" }}>
                            <Typography variant="body2" sx={{ mr: 2 }}>
                                Newest 
                            </Typography>
                            <KeyboardArrowDownIcon />
                        </Button>
                    </Stack>

                    <Searchbar />

                    <TaskListView view={view} setView={setView} /> 
                </Stack>
            </Stack>

            <UpdateListTabPanel tab={tab} index={0} view={view} updates={allUpdates} />
            <UpdateListTabPanel tab={tab} index={1} view={view} updates={taskUpdates} />
            <UpdateListTabPanel tab={tab} index={2} view={view} updates={subtaskUpdates} />
            <UpdateListTabPanel tab={tab} index={3} view={view} updates={commentUpdates} />
            <UpdateListTabPanel tab={tab} index={4} view={view} updates={projectUpdates} />
            <UpdateListTabPanel tab={tab} index={5} view={view} updates={userUpdates} />
        </Box>
    )
}

export default UpdatesList