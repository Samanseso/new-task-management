import { useForm } from "react-hook-form"
import { useEffect, useState } from "react";

import { 
  Container, 
  Box, 
  TextField,
  Stack,
  Typography,
  Button
} from "@mui/material"

import axios from "axios"
import viteLogo from "../assets/vite.svg";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../components/AuthContext";

interface ErrorType {
	hasError: boolean,
	errorMessage: string
}

interface LoginType {
	email : string,
	password : string
}

interface UserType {
    _id: string;
    name: string;
    email: string;
    role: string;
}


const api_base_url = import.meta.env.VITE_API_BASE_URL;

const doLogin = async (data : LoginType) => {
	return axios.post(`${api_base_url}/users/login`, data)
	.then(response => {
		return response;
	})
	.catch(error => {
		return error.response.data.error;
	})
}

const Login = () => {
	const navigate = useNavigate();
	const login  = useAuth()?.login;
	const {register, handleSubmit} = useForm();
	const [ emailError, setEmailError ] = useState<ErrorType>({
		hasError: false,
		errorMessage: ""
	});

	const [ passwordError, setPasswordError ] = useState<ErrorType>({
		hasError: false,
		errorMessage: ""
	});

	const [ loginError, setLoginError ] = useState<ErrorType>({
		hasError: false,
		errorMessage: ""
	});

	const [ loginData, setLoginData] = useState<LoginType>({
		email : "",
		password : ""
	})


	useEffect(() => {
		if (!emailError.hasError && !passwordError.hasError && loginData.email !== "" && loginData.password !== "") {
			doLogin(loginData)
			.then(response => {

				if(response.status === 200) {
					if (login) {
						const userData: UserType = {
							_id: response.data._id,
							name: response.data.name, 
							email: response.data.email, 
							role: response.data.role
						}
						login(userData);
					}
					
					navigate("/");
				}
				else {
					setLoginError({
						hasError: true,
						errorMessage: 	response
					})
				}
			})
		}
	}, [loginData]);


	const checkError = (value : any) => {
		try {
			const values = value as LoginType;
			const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

			setEmailError({
					hasError: false,
					errorMessage: ""
			});

			setPasswordError({
					hasError: false,
					errorMessage: ""
			})


			// check if email is not empty
			if (values.email.length == 0) {
				setEmailError({
					hasError: true,
					errorMessage: "Email is required."
				})
			}
			// check if email is correct format
			else if (!emailPattern.test(values.email)) {
				setEmailError({
					hasError: true,
					errorMessage: "Email is incorrect format."
				})
			}

			// check if password is not empty
			if (values.password.length == 0) {
				setPasswordError({
					hasError: true,
					errorMessage: "Password is required."
				})
			}

			setLoginData(values);
		}
		catch (error) {
			console.log(error)
		}
	}

	return (
		<Container maxWidth="xs" sx={{ pt: 5 }}>
			<Box> 
				<Stack sx={{ alignItems: "center" }}>
					<img src={viteLogo} alt="vite.svg" width={65}/>
					<Typography variant="h5" align="center">
						<p>Welcome Back!</p>
					</Typography>
				</Stack>

				<form onSubmit={handleSubmit(checkError)}>
					<Stack sx={{ p: 2, gap: 2 }}>
						<TextField 
						error={emailError.hasError}
						label="Email" 
						variant="outlined" 
						helperText={emailError.errorMessage}
						{...register("email")}/>

						
						<TextField 
							error={passwordError.hasError}
							label="Password" 
							variant="outlined"  
							helperText={passwordError.errorMessage}
							type="password"  
							{...register("password")}/>
						<Stack>
							<Typography variant="body2" gutterBottom sx={{color: "#d32f2f", textAlign: "center"}}>
								{ loginError.errorMessage }
							</Typography>

							<Button variant="contained" type="submit">Login</Button>
						</Stack>
					</Stack>	
				</form>
			</Box>
		</Container>
	
	)
}

export default Login