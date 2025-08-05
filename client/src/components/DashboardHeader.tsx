import { Stack, Typography, Box } from '@mui/material';
import Searchbar from './Searchbar';
import { useEffect, useState } from 'react';

const DashboardHeader = () => {
    const dateOptions: Intl.DateTimeFormatOptions = { month: 'long', day: 'numeric', year: 'numeric' };
    const timeOptions: Intl.DateTimeFormatOptions = { hour: '2-digit', minute: '2-digit', second: '2-digit' };
    const [dateToday, setDateToday] = useState<string>(new Date().toLocaleDateString('en-US', dateOptions));
    const [timeToday, setTimeToday] = useState<string>(new Date().toLocaleDateString('en-US', timeOptions));

    useEffect(() => {
        const interval = setInterval(() => {
            setDateToday(new Date().toLocaleDateString('en-US', dateOptions));
            setTimeToday(new Date().toLocaleTimeString('en-US', timeOptions));
        }, 1000);

        return () => clearInterval(interval);
    }, []);

    return (
        <Stack sx={{ 
            p: 1, 
            flexDirection: {xs: "column", sm: "row"},
            alignItems: "center", 
            justifyContent: "space-between" }}>
            <Stack direction="row" sx={{ alignSelf: "start", mb: { xs: 2, sm: 0 }, alignItems: "center" }}>
                <Typography variant="h6">
                    Dashboard
                </Typography>
                
            </Stack>
            <Stack direction="row" gap={1} sx={{ width: { xs: "100%", sm: "fit-content" }, justifyContent: "space-between" }}>
               <Searchbar />
               <Box sx={{ border: "1px solid", borderColor: "divider", borderRadius: 1, p: 1, display: "flex", alignItems: "center" }}>
                    <Typography variant="body2" sx={{ }}>
                        {dateToday} - {timeToday}
                    </Typography>
               </Box>
            </Stack>
        </Stack>
    ) 
}

export default DashboardHeader