import { 
    Box,
    Typography
} from '@mui/material'


const Priority = ({ text } : { text : string }) => {

    const getBgColor = () => {
        switch (text) {
            case "Low": return "#34eb74";
            case "Medium": return "#f7fc65";
            case "High": return "#ffa852";
            case "Critical": return "#ff5252";
            default: return "#e3e3e3";
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

export default Priority