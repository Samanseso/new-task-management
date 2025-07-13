import { Avatar, Stack, Paper, Box, Typography } from "@mui/material";
import type { UserType } from "./utils/types"

interface AccountProps {
    account: UserType;
    view: string;
}

function stringToColor(string: string) {
    let hash = 0;
    let i;

    /* eslint-disable no-bitwise */
    for (i = 0; i < string.length; i += 1) {
        hash = string.charCodeAt(i) + ((hash << 5) - hash);
    }

    let color = '#';

    for (i = 0; i < 3; i += 1) {
        const value = (hash >> (i * 8)) & 0xff;
        color += `00${value.toString(16)}`.slice(-2);
    }
    return color;
}

function stringAvatar(name: string) {
    if (name.split(' ').length < 2) {
        return {
            sx: {
                width: 30, height: 30, fontSize: 14,
            },
        }
    }

    return {
        sx: {
			
            bgcolor: stringToColor(name),
        },
        children: `${name.split(' ')[0][0]}${name.split(' ')[1][0]}`,
    };
}

const Account = ({ account, view }: AccountProps) => {
    return (
        <Paper elevation={2} sx={{ 
            p: 0.5,
            px: view === "list" ? 2 : 2, 
            cursor: "pointer",
            borderRadius: view === "list" ? 0 : 1,
            boxShadow: view === "list" ? "none" : 1,
            backgroundColor	: view === "list" ? "transparent" : "#fff"}} 
        > 
            <Stack direction="row" gap={1} sx={{ alignItems: "center"}}>
                <Avatar {...stringAvatar(account.name)}>
                </Avatar>
                <Box sx={{ my: view === "list" ? 0 : 1, width: view === "list" ? "60%" : "unset" }}>
                    <Typography variant='body1' >{account.name}</Typography>
                    <Typography variant='caption' sx={{ color: "#8a8a8a", 
                        display: view === "list" ? "none" : '-webkit-box'}}
                    >
                        {account.email}
                    </Typography>
                </Box>
            </Stack>

        </Paper>
    )
}

export default Account