import type { ReactNode } from "react"
import Header from "./Header"

import { 
    Box, 
	Stack
} from "@mui/material"

import SideBar from './SideBar';

const PageContainer = ({children} : {children : ReactNode}) => {
	return (
		<Stack direction="row" sx={{ width: "100vw", height: "100vh", backgroundColor: "#f0f0f0", overflow: "hidden" }} >
			<Box sx={{ display: { xs: "none", md: "block" } }}>
				<SideBar />
			</Box>
			<Box sx={{ marginLeft: { md: 31.4 }, flex: 1 }}>
				<Header />
				<Box sx={{ padding: 1 }}>
					{children}
				</Box>
			</Box>
		</Stack>
	)
}

export default PageContainer