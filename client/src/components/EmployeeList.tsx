import { Avatar, AvatarGroup, Box, Button, Stack, Typography } from "@mui/material";
import type { UserType } from "./utils/types"
import { useState, type SetStateAction } from "react";

import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CloseIcon from '@mui/icons-material/Close';
import Searchbar from "./Searchbar";

interface EmployeeListProps {
    employees: UserType[];
    setEmployeesModal: React.Dispatch<SetStateAction<boolean>>;
    setMemberList: React.Dispatch<SetStateAction<UserType[]>>;
    memberList: UserType[];
}

function stringToColor(string: string) {
    let hash = 0;
    let i;

    /* eslint-disable no-bitwise */
    for (i = 0; i < string.length; i += 1) {
        hash = string.charCodeAt(i) + ((hash << 5) - hash);
    }

    let color = '#';

    for (i = 0; i < 3; i += 1) {
        const value = (hash >> (i * 8)) & 0xff;
        color += `00${value.toString(16)}`.slice(-2);
    }
    /* eslint-enable no-bitwise */

    return color;
}

function stringAvatar(name: string) {
    return {
        sx: {
            bgcolor: stringToColor(name),
        },
        children: `${name.split(' ')[0][0]}${name.split(' ')[1][0]}`,
    };
}

const EmployeeList = ({ employees, setEmployeesModal, setMemberList, memberList }: EmployeeListProps) => {

    const [selectedMembers, setSelectedMembers] = useState<UserType[]>(memberList);


    const handleClose = () => {
        setMemberList(selectedMembers);
        setEmployeesModal(false);
    }

    return (
        <Stack direction="column" sx={{ height: "100%", justifyContent: "space-between"}}>
            <Box>
                <Stack direction="row" sx={{ justifyContent: "space-between", alignItems: "center", mb: 1, p: 1}}>
                    <Typography id="modal-modal-title" variant="h6">
                        Add Member
                    </Typography>
                    <Button sx={{ color: "#000" }} onClick={() => setEmployeesModal(false)}>
                        <CloseIcon />
                    </Button>
                </Stack>

                <Box sx={{ mb: 1 }}>
                    <Searchbar />
                    <AvatarGroup max={8} sx={{ justifyContent: "start", my: 1, minHeight: 45 }}>
                        {selectedMembers.map((member, memberIdx) => (
                            <Avatar key={memberIdx}  {...stringAvatar(member.name)} />
                        ))}
                    </AvatarGroup>
                </Box>
                <Box sx={{ maxHeight: "40vh", overflowY: "auto",
                    scrollbarGutter: "stable",
                    '&::-webkit-scrollbar': {
                        width: '0.4em',
                    },
                    '&::-webkit-scrollbar-track': {
                        boxShadow: 'inset 0 0 6px rgba(0,0,0,0)',
                        webkitBoxShadow: 'inset 0 0 6px rgba(0,0,0,0)'
                    },
                    '&::-webkit-scrollbar-thumb': { 
                        backgroundColor: 'rgba(0,0,0,0.2)',
                        borderRadius: 10,
                        cursor: "pointer",
                    },
                 }}>
                    {employees.map((employee, employeeIdx) => {
                        return (
                            <Stack direction="row" key={employeeIdx} sx={{ 
                                justifyContent: "space-between",
                                alignItems: "center", p: 1,
                                bgcolor: employeeIdx % 2 === 0 ? "#f5f5f5" : "#fff",
                                borderRadius: 1, cursor: "pointer" }}
                                onClick={() => {
                                    if (selectedMembers.includes(employee)) {
                                        setSelectedMembers(selectedMembers.filter(selectedMember => selectedMember != employee));
                                    }
                                    else {
                                        setSelectedMembers([...selectedMembers, employee]);
                                    }
                                }}>
                                <Stack direction="row" gap={1} sx={{ alignItems: "center" }}>
                                    <Avatar  {...stringAvatar(employee.name)} />
                                    <Stack direction="column"
                                        key={employeeIdx}>
                                        <Box sx={{ cursor: "pointer" }}>
                                            <Typography variant="body2">
                                                {employee.name}
                                            </Typography>
                                            <Typography variant="caption">
                                                {employee.email}
                                            </Typography>
                                        </Box>
                                    </Stack>
                                </Stack>
                                { selectedMembers.includes(employee) && <CheckCircleIcon color="success"/>}
                            </Stack>
                        );
                    })}
                </Box>
                
            </Box>
            <Box sx={{ alignSelf: "end"}}>
                <Button variant="contained" sx={{ textTransform: "none", px: 3 }} onClick={handleClose}>
                    Save
                </Button>
            </Box>
        </Stack>
    )
}

export default EmployeeList