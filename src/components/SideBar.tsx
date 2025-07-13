import { useState } from 'react';

import {
    Box,
    List,
    ListItem,
    ListItemIcon,
    ListItemButton,
    ListItemText,
    Divider,
    Avatar,
    Stack,
    Typography,
} from '@mui/material';

import DashboardIcon from '@mui/icons-material/Dashboard';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import SettingsIcon from '@mui/icons-material/Settings';
import GroupIcon from '@mui/icons-material/Group';
import FolderIcon from '@mui/icons-material/Folder';
import Searchbar from './Searchbar';
import { useNavigate } from 'react-router-dom';



const SideBar = () => {
    const navigate = useNavigate()
    const [isHovered, setIsHovered] = useState(false);

    return (
        <Box sx={{ 
            width: { sx: 250, sm: 300, md: 250 }, 
            scrollbarGutter: "stable",
            backgroundColor: "#fff",
            borderRight: 1, 
            borderColor: "rgba(0,0,0, 0.12)",
            height: "100vh",
            maxHeight: "100vh",
            overflowY: "auto",
            '&::-webkit-scrollbar': {
                width: '0.4em',
            },
            '&::-webkit-scrollbar-track': {
                boxShadow: 'inset 0 0 6px rgba(0,0,0,0)',
                webkitBoxShadow: 'inset 0 0 6px rgba(0,0,0,0)'
            },
            '&::-webkit-scrollbar-thumb': { 
                backgroundColor: isHovered ? 'rgba(0,0,0,0.3)' : 'rgba(0,0,0,0)',
                borderRadius: 10,
                cursor: "pointer",
            },
            position: { md: "fixed" } }} 
            role="presentation"
            onMouseOver={() => setIsHovered(true)}
            onMouseOut={() => setIsHovered(false)}>                
                <List>
                    <ListItem>
                        <Stack direction="row" gap={1}>
                            <Avatar sx={{ bgcolor: "#42f578" }} variant="rounded">
                                E
                            </Avatar>
                            <Stack direction="column">
                                <Typography variant="body1">
                                    Evander Wines
                                </Typography>
                                <Typography variant="caption">
                                    IT Support
                                </Typography>
                            </Stack>
                        </Stack>
                    </ListItem>

                    <Divider />

                    <Box sx={{  my: 2, ml: '0.4em' }}>
                        <Searchbar />
                    </Box>

                    <ListItemButton onClick={() => navigate('/')}>
                        <ListItemIcon sx={{ minWidth: 35 }}>
                            <DashboardIcon />
                        </ListItemIcon>
                        <ListItemText primary={"Dashboard"} sx={{ fontSize: "5px" }} />
                    </ListItemButton>

                    <ListItemButton onClick={() => navigate('/projects')}>
                        <ListItemIcon sx={{ minWidth: 35 }}>
                            <FolderIcon />
                        </ListItemIcon>
                        <ListItemText primary={"Projects"} sx={{ fontSize: "5px" }} />
                        <Box sx={{ bgcolor: "#f55f69", px: 1, py: 0.1, color: "#f5f5f5", borderRadius: 1}}>
                            <Typography variant='caption'>3</Typography>
                        </Box>
                    </ListItemButton>

                    <ListItemButton >
                        <ListItemIcon sx={{ minWidth: 35 }}>
                            <GroupIcon />
                        </ListItemIcon>
                        <ListItemText primary={"Accounts"} sx={{ fontSize: "5px" }} onClick={() => navigate("/accounts")}/>
                        <Box sx={{ bgcolor: "#f55f69", px: 1, py: 0.1, color: "#f5f5f5", borderRadius: 1}}>
                            <Typography variant='caption'>1</Typography>
                        </Box>
                    </ListItemButton>

                    <ListItemButton onClick={() => navigate('/updates')}>
                        <ListItemIcon sx={{ minWidth: 35 }}>
                            <AccessTimeIcon />
                        </ListItemIcon>
                        <ListItemText primary={"Updates"} sx={{ fontSize: "5px" }} />
                    </ListItemButton>

                </List> 


                <Divider />

                <List>
                    <ListItemButton>
                        <ListItemIcon sx={{ minWidth: 35 }}>
                            <AccountCircleIcon />
                        </ListItemIcon>
                        <ListItemText primary={"Profle"} sx={{ fontSize: "5px" }} />
                    </ListItemButton>
                    
                    <ListItemButton>
                        <ListItemIcon sx={{ minWidth: 35 }}>
                            <SettingsIcon />
                        </ListItemIcon>
                        <ListItemText primary={"Settings"} sx={{ fontSize: "5px" }} />
                    </ListItemButton>
                </List>

                
            </Box>
    )
}
export default SideBar