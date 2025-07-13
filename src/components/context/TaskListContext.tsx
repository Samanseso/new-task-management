import { createContext, useContext, useState, type ReactNode } from "react";
import type { TaskType } from "../utils/types";
import axios from "axios";


interface TaskListContextProps {
    tasks: TaskType[];
    loadTaskList: (projectId: string) => void;
    truncateTaskList: () => void;
}

const TaskListContext = createContext<TaskListContextProps | null>(null);

export const TaskListProvider = ({ children }: { children: ReactNode}) => {
    const [tasks, setTasks] = useState<TaskType[]>([]);
    
    const api_base_url = import.meta.env.VITE_API_BASE_URL;

    const loadTaskList = async (projectId: string) => {
        try {
            const response = await axios.get(`${api_base_url}/tasks/project/${projectId}`);
            setTasks(response.data);
        } catch (error) {
            console.error("Error loading tasks:", error);
        }
    };

    const truncateTaskList = () => {
        setTasks([]);
    }

    const values = {
        tasks,
        loadTaskList,
        truncateTaskList
    }

    return (
        <TaskListContext.Provider value={values}>
            {children}
        </TaskListContext.Provider>
    );
};

export const useTaskList = () => {
  const context = useContext(TaskListContext);
  if (!context) {
    throw new Error("useTaskList must be used within a TaskListProvider");
  }
  return context;
};