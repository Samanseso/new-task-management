import { Button, Stack, Typography,  } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';


const AccountListHeader = () => {
    return (
        <Stack sx={{ 
            p: 1, 
            flexDirection: {xs: "column", sm: "row"},
            alignItems: "center", 
            justifyContent: "space-between" }}>
            <Stack direction="row" sx={{ alignSelf: "start", mb: { xs: 2, sm: 0 }, alignItems: "center" }}>
                <Typography variant="h6">
                    Accounts
                </Typography>
                
            </Stack>
            <Stack direction="row" gap={1} sx={{ width: { xs: "100%", sm: "fit-content" }, justifyContent: "space-between" }}>
                <Button variant="contained" endIcon={<AddIcon />}>
                    Add Account
                </Button>
            </Stack>

            
        </Stack>
    )
}

export default AccountListHeader