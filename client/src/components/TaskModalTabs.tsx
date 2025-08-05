import { useEffect, useState } from "react";
import { useTaskModal } from "./context/TaskModalContext";
import type { LogType } from "./utils/types";

import { 
    Tabs,
    Tab,
    Box
} from "@mui/material";

import axios from "axios";
import mongoose from "mongoose";
import TaskModalSubtasks from "./TaskModalSubtasks";
import TaskModalActivities from "./TaskModalActivites";



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
            {...other}>

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

const isValidObjectId = (id: string): boolean => {
    return mongoose.Types.ObjectId.isValid(id);
};

const api_base_url = import.meta.env.VITE_API_BASE_URL;

const getLogs = async (id : string): Promise<LogType[]> => {
    const response = await axios.get(`${api_base_url}/logs/task/${id}`)
    .then(response => {
        return response.data;
    })
    .catch(error => {
        return error.response.data.error;
    });

    return response;
}



const TaskModalTabs = () => {
    const [value, setValue] = useState(0);
    const [logs, setLogs] = useState<LogType[]>([]);
    const { task } = useTaskModal();

    useEffect(() => {
        if (isValidObjectId(task._id)) {
            getLogs(task._id)
            .then(response => {
                setLogs(response.reverse().sort((a, b) => (
                    new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
                )));
            });
        }
    }, [task])


    const handleChange = (_: React.SyntheticEvent, newValue: number) => {
        setValue(newValue);
    };

    return (
        <Box sx={{ width: '100%', mt: 1, height: 320 }}>
            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
                <Tab label="Subtask" {...a11yProps(0)} sx={{ textTransform: "none" }} />
                <Tab label="Attachments" {...a11yProps(1)} sx={{ textTransform: "none" }} />
                <Tab label="Activities" {...a11yProps(2)} sx={{ textTransform: "none" }} />
                </Tabs>
            </Box>
            <CustomTabPanel value={value} index={0}>
                <TaskModalSubtasks />
            </CustomTabPanel>
            <CustomTabPanel value={value} index={1}>
               
            </CustomTabPanel>
            <CustomTabPanel value={value} index={2}>
                <TaskModalActivities logs={logs}/>
            </CustomTabPanel>
        </Box>
    )
}

export default TaskModalTabs