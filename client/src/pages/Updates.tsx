import PageContainer from "../components/PageContainer"
import { useEffect, useState } from "react";

import axios from "axios"; 
import type { LogType } from "../components/utils/types";
import UpdatesList from "../components/UpdatesList";
import UpdatesListHeader from "../components/UpdatesListHeader";

const getUpdates = async (): Promise<LogType[]> => {
    const api_base_url = import.meta.env.VITE_API_BASE_URL;
    try {
        const response = await axios.get(`${api_base_url}/logs`);
        return response.data;
    } catch (error) {
        console.log("Error fetching updates:", error);
        return [];
    }
}

const Updates = () => {
    const [updates, setUpdates] = useState<LogType[]>([]);

    useEffect(() => {
        getUpdates()
        .then(response => {
            setUpdates(response);
            console.log("Updates fetched successfully:", response);
        })
        .catch(error => {
            console.error("Error fetching updates:", error);
        });

        console.log("Updates fetched:", updates);

    }, []);

    return (
        <PageContainer>
            <UpdatesListHeader />
            <UpdatesList updates={updates} />
        </PageContainer>
    )
}

export default Updates