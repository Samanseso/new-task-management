import { Paper, Stack, Typography } from '@mui/material';
import { ResponsiveContainer, AreaChart, Area } from 'recharts';

const data = [
  { name: 'Jan', count: 1 },
  { name: 'Feb', count: 3 },
  { name: 'Mar', count: 4 },
  { name: 'Apr', count: 6 },
  { name: 'May', count: 6 },
  { name: 'Jun', count: 7 },
  { name: 'Jul', count: 8 },
];



const DashboardCompletedTasksChart = () => {
    return (
        <Paper sx={{ height: "22vh", p: 2, display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
            <Stack direction="column">
                <Typography variant="body1" sx={{ fontWeight: "bold", mb: 1 }}>
                    Overdue Tasks
                </Typography>
                <Stack direction="row" gap={1} sx={{ alignItems: "center", justifyContent: "space-between" }}>
                    <Typography variant="h5" sx={{ fontWeight: "bold" }}>8</Typography>
                    <Typography variant="body2" sx={{ fontWeight: "bold", backgroundColor: "#ffc8c2", color: "#ff220a", borderRadius: 10, px: 1 }}>
                        +14%</Typography>
                </Stack>
                <Typography variant="body2">
                    Last 7 days
                </Typography>
            </Stack>
            <ResponsiveContainer width="100%" height="100%">
                <AreaChart
                    data={data}
                >
                <Area
                    type="monotone"
                    dataKey="count"
                    stroke="#ff220a"
                    fill="#ffc8c2"
                />
                </AreaChart>
            </ResponsiveContainer>
        </Paper>
    )
}

export default DashboardCompletedTasksChart