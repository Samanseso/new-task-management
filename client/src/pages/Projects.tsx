import { useEffect, useState} from "react";

import PageContainer from "../components/PageContainer"

import axios from "axios";
import ProjectListHeader from "../components/ProjectListHeader";
import ProjectList from "../components/ProjectList";
import type { ProjectType } from "../components/utils/types";

const api_base_url = import.meta.env.VITE_API_BASE_URL;

const getProjects = async (): Promise<ProjectType[]> => {
    try {
        const response = await axios.get(`${api_base_url}/projects`);
        return response.data;
    } catch (error) {
        console.log(error);
        return [];
    }
}

const Projects = () => {
	const [projects, setProjects] = useState<ProjectType[]>([]);

    useEffect(() => {
        getProjects()
        .then(response => {
            setProjects(response);
        })
        .catch(error => {
            console.log(error.message);
        });
    }, []);

	return (
		<PageContainer>
			<ProjectListHeader />
			<ProjectList projects={projects} />
		</PageContainer>
	)
}

export default Projects