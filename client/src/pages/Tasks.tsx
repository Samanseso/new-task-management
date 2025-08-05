import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";

import PageContainer from "../components/PageContainer"
import TaskListHeader from "../components/TaskListHeader"
import TaskList from "../components/TaskList"

import axios from "axios";
import { useTaskList } from "../components/context/TaskListContext";

const api_base_url = import.meta.env.VITE_API_BASE_URL;

const getProject = async (projectId : string) => {
    const response = await axios.get(`${api_base_url}/projects/${projectId}`)
    .then(response => {
        return response.data;
    })
    .catch(error => {
        return error.response.data.error;
    });

    return response;
}



const ProjectTasks = () => {   
    const params = useParams();
    const projectId = params.id || "";
    
    const [projectTitle, setProjectTitle] = useState("");
    const { loadTaskList } = useTaskList();

    useEffect(() => {
        getProject(projectId)
        .then(response => {
            setProjectTitle(response.title);
        })
        .catch(error => {
            console.log(error.message);
        });

        loadTaskList(projectId);        
    }, [projectId]);
    
    return (
        <PageContainer>
            <TaskListHeader title={projectTitle} projectId={projectId}/>
            <TaskList />
        </PageContainer>
    )
}

export default ProjectTasks