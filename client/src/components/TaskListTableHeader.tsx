import { Box, Stack, Typography } from '@mui/material'

const TaskListTableHeader = () => {
  return (

    <Stack direction="row" sx={{ px: 2, py: 1, borderBottom: 1, borderColor: "#d4d4d4" }}>
        <Stack direction="row" gap={0.5} sx={{ width: "40%"}}>
            <Box sx={{ width: "60%"}}>
                <Typography variant="body1" sx={{ fontWeight: "bold" }}>Title</Typography>
            </Box>
            <Box>
                <Typography variant="body1" sx={{ fontWeight: "bold" }}>Status/Priority</Typography>
            </Box>
        </Stack>
        <Stack direction="row" sx={{ width: "60%", justifyContent: "space-between"}}>
            <Box sx={{ width: "50%"}}>
                <Typography variant="body1" sx={{ fontWeight: "bold" }}>Progress</Typography>
            </Box>
            <Box sx={{ width: "12%"}}>
                <Typography variant="body1" sx={{ fontWeight: "bold" }}>Due Date</Typography>
            </Box>
            <Box sx={{ width: "12%"}}>
                <Typography variant="body1" sx={{ fontWeight: "bold" }}>Members</Typography>
            </Box>
        </Stack>
    </Stack>

  )
}

export default TaskListTableHeader