import { Box, Grid } from "@mui/material";
import DashboardProjectsChart from "./DashboardProjectsChart";
import DashboardTasksChart from "./DashboardTasksChart";
import DashboardCompletedTasksChart from "./DashboardCompletedTasksChart";
import DashboardOverDueTasksChart from "./DashboardOverDueTasksChart";
import DashboardEmployeeChart from "./DashBoardEmployeeChart";

const DashboardBody = () => {
    return (
        <Box sx={{ height: 350, px: 1 }}>
            <Grid container spacing={2} columns={12} sx={{ mb: 2 }}>
                <Grid size={4}>
                    <DashboardCompletedTasksChart />
                </Grid>
                <Grid size={4}>
                    <DashboardOverDueTasksChart />
                </Grid>
                <Grid size={4}>
                    <DashboardEmployeeChart />
                </Grid>
            </Grid>

            <Grid container spacing={2} columns={12}>
                <Grid size={6}>
                    <DashboardProjectsChart />
                </Grid>
                <Grid size={6}>
                    <DashboardTasksChart />
                </Grid>
            </Grid>
        </Box>
    );
};

export default DashboardBody;
