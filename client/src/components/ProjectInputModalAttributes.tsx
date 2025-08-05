import { Box, Button, Stack, Typography, Modal, AvatarGroup, Avatar } from "@mui/material"
import { useState, useEffect, type SetStateAction } from "react"
import type { ProjectInputType, UserType } from "./utils/types"
import axios from "axios"
import EmployeeList from "./EmployeeList"
import type { UseFormRegister, UseFormSetValue } from "react-hook-form"
import { useAuth } from "./AuthContext"
import Priority from "./Priority"
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider"
import { DatePicker } from "@mui/x-date-pickers/DatePicker"
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs"


interface ProjectInputModalAttributesProps {
    register: UseFormRegister<ProjectInputType>;
    setValue: UseFormSetValue<ProjectInputType>;
    setOpen: React.Dispatch<SetStateAction<boolean>>;
}

const modalStyle = {
	position: "absolute" as "absolute",
	top: "50%",
	left: "50%",
	transform: "translate(-50%, -50%)",
	width: "30vw",
    height: "70vh",
	bgcolor: "background.paper",
	boxShadow: 24,
	p: 1,
    borderRadius: 1,
    outline: "none"
};

const api_base_url = import.meta.env.VITE_API_BASE_URL;

const getEmployees = async () => {
    const response = await axios
    .get(`${api_base_url}/users/employees`)
    .then(response => response.data)
    .catch(error => error.response.data.errro);

    return response;
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

const ProjectInputModalAttributes = ({ register, setValue, setOpen }: ProjectInputModalAttributesProps) => {
    const [memberList, setMemberList] = useState<UserType[]>([]);
    const [employeesModal, setEmployeesModal] = useState(false);
    const [employees, setEmployees] = useState<UserType[]>([]);

    const [selectedPriority, setSelectedPriority] = useState({
        index: 0,
        priority: "Low"
    });

    const userId = useAuth()?.user?._id || "";

    useEffect(() => {
        register("members");
        getEmployees()
        .then(response => {
            setEmployees(response);
        });
    },[]);

    useEffect(() => {
        let members: { data: string; assignedBy: string; }[] = [];

        memberList.map((member) => {
            const newMember = {
                data: member._id,
                assignedBy: userId
            }

            members.push(newMember);
        })


        setValue("members", members);
    }, [memberList]);

    return (
        <Box sx={{ width: "100%", height: "100%", bgcolor: "#f5f5f5", borderRadius: 2 }}>
            <Stack direction="column" sx={{ justifyContent: "space-between", height: "100%" }}>
                <Stack direction="column" gap={2} sx={{ p: 2 }}>

                    <Stack direction="row" sx={{ alignItems: "center" }}>
                        <Typography sx={{ width: 90 }} variant="body2">
                            Priority
                        </Typography>
                        <Stack direction="row" gap={1}>
                            {['Low', 'Medium', 'High', 'Critical'].map((item, idx) => {
                                return (
                                    <Box 
                                        key={idx} 
                                        sx={{ opacity: selectedPriority.index == idx ? 1 : 0.3, cursor: "pointer" }} 
                                        onClick={() => setSelectedPriority({ index: idx, priority: item })}>
                                            
                                        <Priority text={item} />
                                    </Box>
                                );
                            })}
                        </Stack>
                    </Stack>

                    <Stack direction="row" sx={{ alignItems: "center" }}>
                        <Typography sx={{ width: 90 }} variant="body2">
                            Due Date
                        </Typography>
                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <DatePicker
                            sx={{ "& .MuiPickersSectionList-root": {
                                width: { xs: 120, md: "auto" }
                            },}}
                            onChange={(value) => {
                                register("dueDate");
                                setValue("dueDate", value?.toISOString() || "");
                            }}
                            />
                        </LocalizationProvider>
                    </Stack>


                    <Box>
                        <Typography variant="body2" sx={{ mb: 1 }}>Members</Typography>

                        <Stack direction="row" gap={1} sx={{ alignItems: "center" }}> 
                            {memberList.length > 0 && 
                                <AvatarGroup max={5} sx={{ justifyContent: "start" }}>
                                    {memberList.map((member, memberIdx) => (
                                        <Avatar key={memberIdx}  {...stringAvatar(member.name)} />
                                    ))}
                                </AvatarGroup>
                            }
                            
                            <Button variant="outlined" sx={{ 
                                textTransform: "none", width: "fit-content", height: "fit-content"}} onClick={() => setEmployeesModal(true)}>
                                Add Member
                            </Button>
                        </Stack>
                    </Box>

                    <Modal
                        open={employeesModal}
                        onClose={() => setEmployeesModal(false)}
                        aria-labelledby="modal-modal-title"
                        aria-describedby="modal-modal-description">

                        <Box sx={modalStyle}>
                            <EmployeeList 
                            employees={employees} 
                            setEmployeesModal={setEmployeesModal} 
                            setMemberList={setMemberList}
                            memberList={memberList}
                            />
                        </Box>
                    </Modal>
                </Stack>

                
                <Stack direction="row" gap={1} sx={{ p: 2 }}>
                    <Button variant="contained" sx={{ flex: 1, bgcolor: "#cccccc", color: "#000" }} onClick={() => setOpen(false)}>Cancel</Button>
                    <Button type="submit" variant="contained" sx={{ flex: 1 }}>Save</Button>
                </Stack>
            </Stack>
        </Box>
    )
}

export default ProjectInputModalAttributes