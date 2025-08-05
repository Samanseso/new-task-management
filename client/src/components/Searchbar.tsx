import { Box, TextField } from "@mui/material"
import SearchIcon from '@mui/icons-material/Search';

const Searchbar = () => {
  return (
    <Box sx={{ display: 'flex', alignItems: 'center', bgcolor: "#ffffff",
        px: 1, borderRadius: 1, border: 1, borderColor: "rgba(0,0,0, 0.12)"
        }}>
        <SearchIcon sx={{ color: 'action.active', mr: 1.2 }} />
        <TextField variant="standard" placeholder='Search' sx={{ borderBottom: 0, "& .MuiInputBase-input": { py: 0.9 } }} 
        slotProps={{
            input: {
                disableUnderline: true,
            },
        }}/>
    </Box>
  )
}

export default Searchbar