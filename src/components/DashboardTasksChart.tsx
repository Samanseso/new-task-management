import { Paper, Stack, Typography } from "@mui/material";
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend
} from "recharts";

const data = [
    { name: "Jan", todo: 12, inProgress:  5, completed:  3 },
    { name: "Feb", todo: 18, inProgress:  8, completed:  6 },
    { name: "Mar", todo: 15, inProgress: 12, completed:  8 },
    { name: "Apr", todo: 20, inProgress: 10, completed: 15 },
    { name: "May", todo: 22, inProgress: 14, completed: 18 },
    { name: "Jun", todo: 25, inProgress: 18, completed: 20 },
    { name: "Jul", todo: 30, inProgress: 20, completed: 25 }
];

const DashboardBody = () => {
	return (
		<Paper
			sx={{
				height: "50vh",
				p: 2,
				display: "flex",
				flexDirection: "column",
				justifyContent: "space-between"
			}}
		>
			<Stack direction="column">
				<Typography variant="body1" sx={{ fontWeight: "bold", mb: 1 }}>
					Tasks Overview
				</Typography>
				<Stack direction="row" gap={1} alignItems="center">
				<Typography variant="h4" sx={{ fontWeight: "bold" }}>
					73
				</Typography>
				<Typography
					variant="body2"
					sx={{
						fontWeight: "bold",
						backgroundColor: "#dfffde",
						color: "#049100",
						borderRadius: 10,
						px: 1
					}}
				>
					+23%
				</Typography>
				</Stack>
				<Typography variant="body2">
					Distribution task status per month for the year 2025
				</Typography>
			</Stack>

			<ResponsiveContainer width="100%" height="100%">
				<BarChart data={data} margin={{ top: 20, right: 30, left: 0, bottom: 0 }}>
					<CartesianGrid strokeDasharray="3 3" />
					<XAxis dataKey="name" />
					<YAxis />
					<Tooltip />
					<Legend verticalAlign="top" />

					{/* stackId="a" ensures bars stack on top of each other */}
					<Bar stackId="a" dataKey="todo"      name="To Do"       fill="#8884d8" />
					<Bar stackId="a" dataKey="inProgress" name="In Progress" fill="#82ca9d" />
					<Bar stackId="a" dataKey="completed"  name="Completed"   fill="#ffc658" />
				</BarChart>
			</ResponsiveContainer>
		</Paper>
	);
};

export default DashboardBody;
