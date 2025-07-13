import { 
	Autocomplete,
	TextField,
} from '@mui/material';
import Priority from './Priority';


const SelectPriority = ({ text } : { text: string }) => {
	
	
	return (
		<Autocomplete
		sx={{
			width: 200,
			outline: 0,
			"& .MuiOutlinedInput-root": {
				p: 0,
				borderRadius: "0",
			},
		
			"& .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline": {
				border: 0,
				
			},
			"& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline": {
				border: 0,
				
			},
        }}
		options={["Low", "Medium", "High", "Critical"]}
		defaultValue={text}
		renderValue={(value) => (
			<Priority text={value}/>
		)}
		renderInput={(params) => <TextField {...params} sx={{ p: 0 }} />}
		/>
	)
}

export default SelectPriority		