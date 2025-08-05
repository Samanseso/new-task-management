import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import type { BreadcrumbsType } from './utils/types';

import { 
	Breadcrumbs,
	Link
} from '@mui/material'


import mongoose from 'mongoose';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import axios from 'axios';


const api_base_url = import.meta.env.VITE_API_BASE_URL;

const getItem = async (id : string, module: any) => {
    const response = await axios.get(`${api_base_url}/${module}/${id}`)
    .then(response => {
        return response.data.title;
    })
    .catch(error => {
		console.log(error);
        return error;
    });

    return response;
}


const HeaderBreadcrumbs = () => {

    const [breadcrumbsItems, setBreadcrumbsItems] = useState<BreadcrumbsType[]>([]);

    const location = useLocation();
    const paths = location.pathname == "/" ? [""] : location.pathname.split("/");

	const generateBreadcrumbs = async () => {
		let items: BreadcrumbsType[] = [];
		let prevText = "";
		let prevPath = "";
		if (items.length === 0) {
			for (const item of paths) {
				if (items.length === 0 && item === "") {
					prevText = "Dashboard";
					items.push({ path: "/", text: prevText });
				} else if (mongoose.Types.ObjectId.isValid(item)) {
					const response = await getItem(item, prevText);
					prevPath += `/${item}`;
					prevText = response;
					items.push({ path: prevPath, text: response });
				} else if (item !== "") {
					prevPath += `/${item}`;
					prevText = item;
					const newText = item.charAt(0).toUpperCase() + item.slice(1);
					items.push({ path: prevPath, text: newText });
				}
			}
		}
		setBreadcrumbsItems(items)
	};

	useEffect(() => {
		generateBreadcrumbs();
	}, []);
	

    return (
       	<Breadcrumbs separator={<NavigateNextIcon fontSize="small" />} aria-label="breadcrumb">
			{breadcrumbsItems.map((item, itemIdx) => (
				<Link underline="hover" key={itemIdx} color="inherit" href={item.path}>
					{item.text}
				</Link>
			))}
		</Breadcrumbs>
    )
}

export default HeaderBreadcrumbs