import { Button, Stack, Typography,  } from '@mui/material';

const UpdatesListHeader = () => {
  return (
        <Stack sx={{ 
            p: 1, 
            flexDirection: {xs: "column", sm: "row"},
            alignItems: "center", 
            justifyContent: "space-between" }}>
            <Stack direction="row" sx={{ alignSelf: "start", mb: { xs: 2, sm: 0 }, alignItems: "center" }}>
                <Typography variant="h6">
                    Updates
                </Typography>
                
            </Stack>
            <Stack direction="row" gap={1} sx={{ width: { xs: "100%", sm: "fit-content" }, justifyContent: "space-between" }}>
                <Button variant="contained">
                    Select Entity
                </Button>
            </Stack>

            
        </Stack>
    )
}

export default UpdatesListHeader