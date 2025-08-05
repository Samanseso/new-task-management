import { BrowserRouter, Routes, Route} from 'react-router-dom';
import { ThemeProvider } from './components/ThemeContext';
import { AuthProvider } from './components/AuthContext';
import { TaskListProvider } from './components/context/TaskListContext';
import { TaskModalProvider } from './components/context/TaskModalContext';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';

import '@fontsource/roboto/300.css';
import Projects from './pages/Projects';
import Tasks from './pages/Tasks';
import Updates from './pages/Updates';
import Accounts from './pages/Accounts';



function App() {
	
  
	return (
		<AuthProvider>
			<ThemeProvider>
				<TaskListProvider>
					<TaskModalProvider>
						<BrowserRouter>
							<Routes>
								<Route path="/" element={<Dashboard />} />
								<Route path="/dashboard" element={<Dashboard />} />
								<Route path="/login" element={<Login />}/>
								<Route path="/tasks/:id" element={<Tasks />} />
								<Route path="/projects" element={<Projects />} />
								<Route path='/projects/:id' element={<Tasks />} />
								<Route path='/updates' element={<Updates />} />
								<Route path='/accounts' element={<Accounts />} />
							</Routes>
						</BrowserRouter>
					</TaskModalProvider>
				</TaskListProvider>
			</ThemeProvider>
		</AuthProvider>
	)
}

export default App
