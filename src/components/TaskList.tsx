import { useEffect, useState } from "react";
import { useTaskList } from "./context/TaskListContext";
import type { TaskType } from "./utils/types";
import { useTaskModal } from "./context/TaskModalContext";

import {
    Box,
    Typography,
    Stack,
    Button,
    Grid,
    Tabs,
    Tab
} from "@mui/material"

import TaskModalDetails from "./TaskModalDetails";
import Task from "./Task";
import TabLabel from "./TabLabel";
import Searchbar from "./Searchbar";

import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import TaskListView from "./TaskListView";
import TaskListTableHeader from "./TaskListTableHeader";

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

const TaskList = () => {
    const [toDoTasks, setToDoTasks] = useState<TaskType[]>([]);
    const [inProgressTasks, setInProgressTasks] = useState<TaskType[]>([]);
    const [completedTasks, setCompletedTasks] = useState<TaskType[]>([]);
    const [view, setView] = useState(sessionStorage.getItem("view") || "grid");
    const [tab, setTab] = useState(0);

    const { tasks } = useTaskList();
    const { 
        modalToggle,
    } = useTaskModal();

    


    useEffect(() => {
        const toDo = tasks.filter((el : TaskType) => {
            return el.status == "To Do";
        });
        setToDoTasks(toDo);

        const inProgress = tasks.filter((el : TaskType) => {
            return el.status == "In Progress";
        })
        setInProgressTasks(inProgress);

        const completed = tasks.filter((el : TaskType) => {
            return el.status == "Completed";
        })
        setCompletedTasks(completed);
        
    }, [tasks])


    const handleChange = (_: React.SyntheticEvent, newValue: number) => {
        setTab(newValue);
    };

    return (
        <Box sx={{ px: 1 }}>
            <Stack direction="row" sx={{ justifyContent: "space-between", mb: 0.5}}>
                <Box sx={{ backgroundColor: "#d9d9d9", p: 0.4, borderRadius: 1,  "& .MuiTab-root": { borderRadius: 1, padding: 1, minHeight: "fit-content" }, "& .MuiTabs-root": { minHeight: "fit-content" } }}>
                    <Tabs sx={{  "& .MuiTabs-indicator": { height: "100%", backgroundColor: "#fff", borderRadius: 1 } }} value={tab} onChange={handleChange} aria-label="basic tabs example">
                        <Tab label={<TabLabel text={"To Do"} count={toDoTasks.length} />} sx={{ textTransform: "none" }} {...a11yProps(0)} />
                        <Tab label={<TabLabel text={"In Progress"} count={inProgressTasks.length} />} sx={{ textTransform: "none" }} {...a11yProps(1)} />
                        <Tab label={<TabLabel text={"Completed"} count={completedTasks.length} />} sx={{ textTransform: "none" }} {...a11yProps(2)} />
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
                <Stack sx={{ direction: "column", bgcolor: view === "list" ? "#fff" : "unset", borderRadius: 1, boxShadow:  view === "list" ? 1: 0 }}>
                    {view === "list" && <TaskListTableHeader />}
                    <Grid container spacing={view == "list" ? 0.5 : 1.5} columns={view === "list" ? 1 : { xs: 1 , sm: 8, md: 12 }} sx={{  }}>
                        {toDoTasks.map((task, index) => (
                            <Grid key={index} size={{ xs: 1, sm: 4, md: 6, lg: 4 }} sx={{ borderBottom: 1, borderColor: "#d4d4d4"}}>
                                <Task task={task} view={view}/>
                            </Grid>
                        ))}
                    </Grid>
                </Stack> 
            </CustomTabPanel>
            <CustomTabPanel value={tab} index={1}>
                <Stack sx={{ direction: "column", bgcolor: view === "list" ? "#fff" : "unset", borderRadius: 1, boxShadow: view === "list" ? 1: 0 }}>
                    {view === "list" && <TaskListTableHeader />}
                    <Grid container spacing={view == "list" ? 0.5 : 1.5} columns={view === "list" ? 1 : { xs: 1 , sm: 8, md: 12 }} sx={{  }}>
                        {inProgressTasks.map((task, index) => (
                            <Grid key={index} size={{ xs: 1, sm: 4, md: 6, lg: 4 }} sx={{ borderBottom: 1, borderColor: "#d4d4d4"}}>
                                <Task task={task} view={view}/>
                            </Grid>
                        ))}
                    </Grid>
                </Stack> 
            </CustomTabPanel>
            <CustomTabPanel value={tab} index={2}>
                <Stack sx={{ direction: "column", bgcolor: view === "list" ? "#fff" : "unset", borderRadius: 1, boxShadow: view === "list" ? 1: 0 }}>
                    {view === "list" && <TaskListTableHeader />}
                    <Grid container spacing={view == "list" ? 0.5 : 1.5} columns={view === "list" ? 1 : { xs: 1 , sm: 8, md: 12 }} sx={{  }}>
                        {completedTasks.map((task, index) => (
                            <Grid key={index} size={{ xs: 1, sm: 4, md: 6, lg: 4 }} sx={{ borderBottom: 1, borderColor: "#d4d4d4"}}>
                                <Task key={index} task={task} view={view}/>
                            </Grid>
                        ))}
                    </Grid>
                </Stack> 
            </CustomTabPanel>

            {modalToggle && <TaskModalDetails />}
        </Box>
    )
}

export default TaskList