import React from "react";
import { Stack, Typography } from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import type { UseFormRegister, UseFormSetValue } from "react-hook-form";

interface TaskInputDueDateProps {
	register: UseFormRegister<any>;
	setValue: UseFormSetValue<any>;
}

const TaskInputDueDate: React.FC<TaskInputDueDateProps> = ({ register, setValue }) => {
	return (
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
					setValue("dueDate", value?.toISOString());
				}}
				/>
			</LocalizationProvider>
		</Stack>
	);
};

export default TaskInputDueDate;
