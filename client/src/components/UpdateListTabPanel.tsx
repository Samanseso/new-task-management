import React from 'react'
import type { LogType } from './utils/types'
import { Box, Stack, Grid } from '@mui/material';
import Update from './Update';

interface UpdateListTabPanelProps {
    tab: number;
    index: number;
    view: string;
    updates: LogType[];
}

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function CustomTabPanel(props: TabPanelProps) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
            >
            {value === index && <Box sx={{ pt: 1 }}>{children}</Box>}
        </div>
    );
}


const UpdateListTabPanel = ({ tab, index, view, updates }: UpdateListTabPanelProps) => {
    return (
        <CustomTabPanel value={tab} index={index}>
            <Stack sx={{ direction: "column", bgcolor: view === "list" ? "#fff" : "unset", borderRadius: 1, boxShadow:  view === "list" ? 1: 0 }}>
                <Grid container spacing={view == "list" ? 0.5 : 1.5} columns={view === "list" ? 1 : { xs: 1 , sm: 8, md: 12 }} sx={{  }}>
                    {updates.map((update, index) => (
                        <Grid key={index} size={{ xs: 1, sm: 4, md: 6, lg: 4 }} >
                            <Update key={index} update={update} view={view} />
                        </Grid>
                    ))}
                </Grid>
            </Stack> 
        </CustomTabPanel>
    )
}

export default UpdateListTabPanel