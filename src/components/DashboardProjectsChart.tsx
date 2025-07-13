import { Typography, Stack, Paper } from "@mui/material";
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from "recharts";

const data = [
    { name: 'Jan', count:  5},
    { name: 'Feb', count:  8},
    { name: 'Mar', count: 15},
    { name: 'Apr', count: 14},
    { name: 'May', count: 18},
    { name: 'Jun', count: 22},
    { name: 'Jul', count: 30},
];

const DashboardProjectsChart = () => {
    return (
        <Paper sx={{ height: "50vh", p: 2, display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
            <Stack direction="column">
                <Typography variant="body1" sx={{ fontWeight: "bold", mb: 1 }}>
                    Projects Overview
                </Typography>
                <Stack direction="row" gap={1} alignItems="center">
                    <Typography variant="h4" sx={{ fontWeight: "bold" }}>30</Typography>
                    <Typography variant="body2" sx={{ fontWeight: "bold", backgroundColor: "#dfffde", color: "#049100", borderRadius: 10, px: 1 }}>
                        +36%</Typography>
                </Stack>
                <Typography variant="body2">
                    Projects created per month for the year 2025
                </Typography>
            </Stack>
            <ResponsiveContainer width="100%" height="100%">
                <AreaChart
                    data={data}
                    margin={{ top: 20, right: 30, left: 0, bottom: 0 }}
                >
                <XAxis dataKey="name" />
                <YAxis />
                <CartesianGrid strokeDasharray="3 3" />
                <Tooltip />
                <Area
                    type="monotone"
                    dataKey="count"
                    stroke="#8884d8"
                    fill="#8884d8"
                />
                </AreaChart>
            </ResponsiveContainer>
        </Paper>
    )
}

export default DashboardProjectsChart