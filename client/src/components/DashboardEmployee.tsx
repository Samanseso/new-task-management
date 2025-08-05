import { Paper, Stack, Typography } from "@mui/material"
import { ResponsiveContainer, AreaChart, Area } from "recharts";

const data = [
    { name: 'Jan', count: 5 },
    { name: 'Feb', count: 7 },
    { name: 'Mar', count: 6 },
    { name: 'Apr', count: 8 },
    { name: 'May', count: 9 },
    { name: 'Jun', count: 10 },
    { name: 'Jul', count: 12 },
];


const DashboardEmployee = () => {
    return (
        <Paper sx={{ height: "22vh", p: 2, display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
            <Stack direction="column">
                <Typography variant="body1" sx={{ fontWeight: "bold", mb: 1 }}>
                    New Employees
                </Typography>
                <Stack direction="row" gap={1} sx={{ alignItems: "center", justifyContent: "space-between" }}>
                    <Typography variant="h5" sx={{ fontWeight: "bold" }}>12</Typography>
                    <Typography variant="body2" sx={{ fontWeight: "bold", backgroundColor: "#dfffde", color: "#049100", borderRadius: 10, px: 1 }}>
                        +20%</Typography>
                </Stack>
                <Typography variant="body2">
                    Last 30 days
                </Typography>
            </Stack>
            <ResponsiveContainer width="100%"  height="100%">
                <AreaChart
                    data={data}
                >
                <Area
                    type="monotone"
                    dataKey="count"
                    stroke="#049100"
                    fill="#dfffde"
                />
                </AreaChart>
            </ResponsiveContainer>
        </Paper>
    )
}

export default DashboardEmployee