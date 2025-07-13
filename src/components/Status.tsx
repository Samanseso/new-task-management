
import { 
    Box,
    Typography
} from '@mui/material'


const Status = ({ text } : { text : string }) => {

    const getBgColor = () => {
        switch (text) {
            case "To Do": return "#34cceb";
            case "In Progress": return "#e6affa";
            case "Completed": return "#34eb74"
            default: return "#e6e6e6";
        }
    }

    return (
        <Box sx={{ backgroundColor: getBgColor(), width: 'fit-content', py: 0.2, px: 1, borderRadius: 1, height: "fit-content", textWrap: "nowrap" }}>
            <Typography variant='caption'>
                {text}
            </Typography>
        </Box>
    )
}

export default Status