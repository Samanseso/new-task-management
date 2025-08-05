import { useEffect, useState } from "react";
import type { UseFormRegister, UseFormSetValue } from "react-hook-form";
import type { InputTaskType, UserType } from "./utils/types";

import { Stack, 
	Typography, 
	Button, 
	Modal, 
	Box,
	Avatar,
	AvatarGroup,
} from "@mui/material";

import Status from "./Status";
import Priority from "./Priority";
import axios from "axios";
import EmployeeList from "./EmployeeList";
import TaskInputDueDate from "./TaskInputDueDate";


interface TaskInputAttributesProps {
  register: UseFormRegister<InputTaskType>;
  setValue: UseFormSetValue<InputTaskType>;
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
    if (name.split(' ').length < 2) {
        return {
            sx: {
                width: 30, height: 30, fontSize: 14,
            },
        }
    }

    return {
        sx: {
            bgcolor: stringToColor(name),
        },
        children: `${name.split(' ')[0][0]}${name.split(' ')[1][0]}`,
    };
}

const api_base_url = import.meta.env.VITE_API_BASE_URL;

const getEmployees = async () => {
	const response = await axios
	.get(`${api_base_url}/users/employees`)
	.then(response => response.data)
	.catch(error => error.response.data.errro);

	return response;
}

const TaskInputAttributes = ({ register, setValue } : TaskInputAttributesProps) => {
	const [memberList, setMemberList] = useState<UserType[]>([]);
    const [employeesModal, setEmployeesModal] = useState(false);
    const [employees, setEmployees] = useState<UserType[]>([]);

	const [selectedPriority, setSelectedPriority] = useState({
		index: 0,
		priority: "Low"
	});



	useEffect(() => {
		getEmployees()
		.then(response => {
			setEmployees(response);
		})
	},[])

	useEffect(() => {
		register("priority");
		setValue("priority", selectedPriority.priority);
		
	}, [selectedPriority]);





	return (
		<Stack direction="column" gap={3}>
			<Stack direction="row" sx={{ alignItems: "center" }}>
				<Typography sx={{ width: 90 }} variant="body2">
					Status
				</Typography>
				<Status text="To Do" />
			</Stack>
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
			
			<TaskInputDueDate register={register} setValue={setValue} />	

			<Stack direction="column" >
				<Typography sx={{ mb: 1 }} variant="body2">
					Assignee
				</Typography>
				<Stack direction="row" gap={1} sx={{ alignItems: "center" }}> 
					{memberList.length > 0 && 
						<AvatarGroup max={5} sx={{ justifyContent: "start" }}>
							{memberList.map((member, memberIdx) => (
								<Avatar key={memberIdx}  {...stringAvatar(member.name)} />
							))}
						</AvatarGroup>
					}
					
					<Button variant="outlined" sx={{ textTransform: "none" }} onClick={() => setEmployeesModal(true)}>
						Add Assignee
					</Button>
				</Stack>

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
		</Stack>
	);
};

export default TaskInputAttributes;
