import { Box, Button, Grid, Stack, Tab, Tabs, Typography } from "@mui/material"
import Searchbar from "./Searchbar"
import TabLabel from "./TabLabel"
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import { useState } from "react";
import TaskListView from "./TaskListView";
import Project from "./Project";
import type { ProjectType } from "./utils/types";


interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}



function CustomTabPanel(props: TabPanelProps) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
            >
            {value === index && <Box sx={{ pt: 1 }}>{children}</Box>}
        </div>
    );
}

function a11yProps(index: number) {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`,
    };
}


const ProjectList = ({ projects }: { projects: ProjectType[] }) => {
    const [view, setView] = useState(sessionStorage.getItem("view") || "grid");
    const [tab, setTab] = useState(0);

    const handleChange = (_: React.SyntheticEvent, newValue: number) => {
        setTab(newValue);
    };

    return (
        <Box sx={{ px: 1 }}>
            <Stack direction="row" sx={{ justifyContent: "space-between", mb: 0.5}}>
                <Box sx={{ backgroundColor: "#d9d9d9", p: 0.4, borderRadius: 1,  "& .MuiTab-root": { borderRadius: 1, padding: 1, minHeight: "fit-content" }, "& .MuiTabs-root": { minHeight: "fit-content" } }}>
                    <Tabs sx={{  "& .MuiTabs-indicator": { height: "100%", backgroundColor: "#fff", borderRadius: 1 } }} value={tab} onChange={handleChange} aria-label="basic tabs example">
                        <Tab label={<TabLabel text={"All"} count={projects.length} />} sx={{ textTransform: "none" }} {...a11yProps(0)} />
                        <Tab label={<TabLabel text={"Archived"} count={0} />} sx={{ textTransform: "none" }} {...a11yProps(1)} />
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

            <CustomTabPanel value={tab} index={0}>
                <Stack sx={{ direction: "column", gap: 1 }}>
                    <Grid container spacing={view == "list" ? 1 : 1.5} columns={view === "list" ? 1 : { xs: 1 , sm: 8, md: 12 }}>
                        {projects.map((project, index) => <Project key={index} project={project} view={view}/>)}
                    </Grid>
                </Stack> 
            </CustomTabPanel>
            <CustomTabPanel value={tab} index={1}>
                <Stack sx={{ direction: "column", gap: 1 }}>
                    <Grid container spacing={view == "list" ? 1 : 1.5} columns={view === "list" ? 1 : { xs: 1 , sm: 8, md: 12 }}>
                        
                    </Grid>
                </Stack> 
            </CustomTabPanel>
            <CustomTabPanel value={tab} index={2}>
                <Stack sx={{ direction: "column", gap: 1 }}>
                    <Grid container spacing={view == "list" ? 1 : 1.5} columns={view === "list" ? 1 : { xs: 1 , sm: 8, md: 12 }}>
                        
                    </Grid>
                </Stack> 
            </CustomTabPanel>
        </Box>
    )
}

export default ProjectList