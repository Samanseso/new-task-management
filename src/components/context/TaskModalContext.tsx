import React, { createContext, useContext, useEffect, useState, type ReactNode, type SetStateAction } from "react";
import type { TaskType } from "../utils/types";
import axios from "axios";

const api_base_url = import.meta.env.VITE_API_BASE_URL;

const getTask = async (taskId: string): Promise<TaskType> => {

    const response = await axios
    .get(`${api_base_url}/tasks/${taskId}`)
    .then(response => response.data)
    .catch(error => console.log(error));

    return response
};

const emptyTask = {
    projectId: "",
    comments: [],
    subtasks: [],
    dueDate: "",
    createdAt: "",
    createdBy: {
        _id: "",
        name: "",
        email: "",
        role: "",
    },
    description: "",
    priority: "",
    status: "",
    title: "",
    _id: "",
    assignedTo: [],
}

interface TaskModalContextProps {
    task: TaskType;
    loadModalTask: (taskId: string) => void;
    modalToggle: boolean;
    setModalToggle: React.Dispatch<SetStateAction<boolean>>;
}

const TaskModalContext = createContext<TaskModalContextProps | null>(null);

export const TaskModalProvider = ({ children }: { children: ReactNode}) => {
    const [task, setTask] = useState<TaskType>(emptyTask);
    const [modalToggle, setModalToggle] = useState(false);

    const loadModalTask = async (taskId: string) => {
        getTask(taskId)
        .then(response => setTask(response))
        .catch(error => error);
    }

    useEffect(() => {
        setTask(emptyTask);
    }, [modalToggle]);

   

    const values = {
        task, loadModalTask,
        modalToggle,
        setModalToggle
    }

    return (
        <TaskModalContext.Provider value={values}>
            {children}
        </TaskModalContext.Provider>
    );
};

export const useTaskModal = () => {
  const context = useContext(TaskModalContext);
  if (!context) {
    throw new Error("useTaskList must be used within a TaskModalProvider");
  }
  return context;
};