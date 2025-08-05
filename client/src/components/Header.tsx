import { useState } from 'react';
import { 
    Button,
    Stack,
    Drawer,
} from '@mui/material'

import MenuIcon from '@mui/icons-material/Menu';;
import SideBar from './SideBar';
import HeaderBreadcrumbs from './HeaderBreadcrumbs';


const Header = () => {
    const [open, setOpen] = useState(false);

    

    const toggleDrawer = (newOpen: boolean) => () => {
        setOpen(newOpen);
    };



    return (
        <Stack direction="row" sx={{ 
            p: 1, 
            minHeight: 25,
            bgcolor: "#ffffff",
            borderBottom: 1,
            borderColor: "#c9c9c9",
            alignItems: "center", 
            justifyContent: "space-between" }}>

            <Stack direction="row" gap={2}>
                <Button onClick={toggleDrawer(true)} sx={{ p: 0, minWidth: "unset", display: { md: "none" } }}>
                    <MenuIcon />
                </Button>
                <Drawer open={open} onClose={toggleDrawer(false)}>
                    <SideBar />
                </Drawer>

                <HeaderBreadcrumbs />
               
            </Stack>
            
            
        </Stack>
    )
}

export default Header