import { Autocomplete, TextField, Typography, Box } from '@mui/material';
import { useEffect, useState } from "react";

interface Project {
	_id: string
  	title: string;
}

interface TaskInputProjectTitleProps {
	projects: Project[];
	defaultValue?: string;
	onProjectSelect: (projectId: string | null) => void;
	error: string;
}

const TaskInputProjectTitle = ({ projects, defaultValue, onProjectSelect, error } : TaskInputProjectTitleProps) => {

	const [selectedProject, setSelectedProject] = useState<Project | null>(null);
	
	useEffect(() => {
		if (defaultValue && projects.length > 0) {
			const defaultProject = projects.find((project) => project.title === defaultValue) || null;
			setSelectedProject(defaultProject);
			onProjectSelect(defaultProject ? defaultProject._id : null);			
		}


	}, [defaultValue, projects]);

	return (
		<>
			<Typography variant="body2" sx={{ mb: 1 }}>
				Project
			</Typography>
			<Autocomplete
				sx={{ mb: 2 }}
				options={projects}
				getOptionLabel={(option) => option.title}
				value={selectedProject}
				onChange={(_, newValue) => {
					setSelectedProject(newValue);
					onProjectSelect(newValue ? newValue._id : null);		
				}}
				renderInput={(params) => {
					return (
						<Box>
							<TextField error={ error != "" } {...params} placeholder="Select project" helperText={error} />
						</Box>
					)
				}} />
		</>
	);
};

export default TaskInputProjectTitle;
