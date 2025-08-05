import { Stack, Typography, Box } from '@mui/material'

const TabLabel = ({ text, count }: { text: string, count: number}) => {
	return (
		<Stack direction="row" gap={1} sx={{ zIndex: 1}}>
			<Typography variant='body2' sx={{ color: "#000" }}>{text}</Typography>
			{count > 0 && 
			<Box sx={{ bgcolor: "#f55f69", px: 1, pt: 0.3, color: "#f5f5f5", borderRadius: 1}}>
				<Typography variant='caption'>{count}</Typography>
			</Box>
			}
		</Stack>
	)
}

export default TabLabel	