import { useState, type SetStateAction } from 'react';

import { Box, Tabs, Tab } from '@mui/material';

import GridViewIcon from '@mui/icons-material/GridView';
import ViewListIcon from '@mui/icons-material/ViewList';


interface TaskListViewProps {
    view: string;
    setView: React.Dispatch<SetStateAction<string>>;
}


function a11yProps(index: number) {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`,
    };
}

const TaskListView = ({ view, setView }: TaskListViewProps) => {
    const [tab, setTab] = useState(view === "list" ? 0 : 1);

    const handleChange = (_: React.SyntheticEvent, newValue: number) => {
        setTab(newValue);
        sessionStorage.setItem("view", newValue === 0 ? "list" : "grid");
        setView(newValue === 0 ? "list" : "grid");
    };

    return (
        <Box>
            <Box sx={{ backgroundColor: "#d9d9d9", p: 0.4, borderRadius: 1,  "& .MuiTab-root": { borderRadius: 1, padding: 1, minHeight: "fit-content" }, "& .MuiTabs-root": { minHeight: "fit-content" } }}>
                <Tabs sx={{  "& .MuiTabs-indicator": { height: "100%", backgroundColor: "#fff", borderRadius: 1 }, "& .MuiTab-root": { minWidth: "fit-content", py: 0.75 } }} value={tab} onChange={handleChange} aria-label="basic tabs example">
                    <Tab label={<ViewListIcon  sx={{ fontSize: 20, color: "#000", zIndex: 1 }} />} sx={{ textTransform: "none" }} {...a11yProps(0)} />
                    <Tab label={<GridViewIcon sx={{ fontSize: 20, color: "#000", zIndex: 1 }} />} sx={{ textTransform: "none" }} {...a11yProps(1)} />
                </Tabs>
            </Box>

        </Box>
    )
}

export default TaskListView