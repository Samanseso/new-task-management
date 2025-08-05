import { Box, Stack, Tabs, Tab, Typography, Button } from "@mui/material";
import Searchbar from "./Searchbar";
import TabLabel from "./TabLabel";
import TaskListView from "./TaskListView";
import AccountListTabPanel from "./AccountListTabPanel";
import type { UserType } from "./utils/types";
import { useEffect, useState } from "react";

import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';


interface AccountListProps {
    accounts: UserType[];
}

function a11yProps(index: number) {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`,
    };
}

const AccountList = ({ accounts }: AccountListProps) => {

    const [allAccounts, setAllAccounts] = useState<UserType[]>(accounts);
    const [adminAccounts, setAdminAccounts] = useState<UserType[]>([]);
    const [employeeAccounts, setEmployeeAccounts] = useState<UserType[]>([]);
    const [view, setView] = useState(sessionStorage.getItem("view") || "grid");
    const [tab, setTab] = useState(0);
    

    useEffect(() => {
        setAllAccounts(accounts);
        setAdminAccounts(accounts.filter(account => account.role === "admin"));
        setEmployeeAccounts(accounts.filter(account => account.role === "employee"));
    }, [accounts]);

    
    const handleChange = (_: React.SyntheticEvent, newValue: number) => {
        setTab(newValue);
    };

    return (
        <Box sx={{ px: 1 }}>
            <Stack direction="row" sx={{ justifyContent: "space-between", mb: 0.5}}>
                <Box sx={{ backgroundColor: "#d9d9d9", p: 0.4, borderRadius: 1,  "& .MuiTab-root": { borderRadius: 1, padding: 1, minHeight: "fit-content" }, "& .MuiTabs-root": { minHeight: "fit-content" } }}>
                    <Tabs sx={{  "& .MuiTabs-indicator": { height: "100%", backgroundColor: "#fff", borderRadius: 1 } }} value={tab} onChange={handleChange} aria-label="basic tabs example">
                        <Tab label={<TabLabel text={"All"} count={allAccounts.length} />} sx={{ textTransform: "none" }} {...a11yProps(0)} />
                        <Tab label={<TabLabel text={"Admin"} count={adminAccounts.length} />} sx={{ textTransform: "none" }} {...a11yProps(1)} />
                        <Tab label={<TabLabel text={"Employee"} count={employeeAccounts.length} />} sx={{ textTransform: "none" }} {...a11yProps(2)} />
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

            <AccountListTabPanel tab={tab} index={0} view={view} accounts={allAccounts} />
            <AccountListTabPanel tab={tab} index={1} view={view} accounts={adminAccounts} />
            <AccountListTabPanel tab={tab} index={2} view={view} accounts={employeeAccounts} />
        </Box>
    )
}

export default AccountList