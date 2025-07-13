import AccountListHeader from "../components/AccountListHeader"
import AccountList from "../components/AccountList"
import PageContainer from "../components/PageContainer"
import type { UserType } from "../components/utils/types";

import axios from "axios";
import { useEffect, useState } from "react";

const getAccounts = async (): Promise<UserType[]> => {
    const api_base_url = import.meta.env.VITE_API_BASE_URL;
    try {
        const response = await axios.get(`${api_base_url}/users`);
        return response.data;
    } 
    catch (error) {
        console.error("Error fetching accounts:", error);
        return [];
    }
}

const Accounts = () => {
    const [accounts, setAccounts] = useState<UserType[]>([]);

    useEffect  (() => { 
        getAccounts()
        .then(response => {
            setAccounts(response)
            console.log("Accounts fetched successfully:", response);
        })
        .catch(error => {
            console.error("Error fetching accounts:", error);
        });

    }, []);

    return (
        <PageContainer>
            <AccountListHeader />
            <AccountList accounts={accounts}/>
        </PageContainer>
    )
}

export default Accounts

