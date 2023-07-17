import React, { useContext } from "react";
import { Typography, TextField, Button } from '@mui/material';
import PasswordInput from "../Password";
import { useForm } from "react-hook-form";
import { useNavigate } from 'react-router-dom'
import { AuthContext } from "../../context/AuthContext";


const textFieldStyle = {
    '& label.Mui-focused': {
        color: 'rgb(135, 212, 208)',
      },
    '& .MuiInput-underline:after': {
        borderBottomColor: 'rgb(135, 212, 208)',
      },
    width: '220px'    
}

const h2Style = {
    textAlign: 'center',
    marginBottom: '55px',
    color: 'rgb(85, 85, 85)'
}

const buttonStyle = {
    backgroundColor: 'rgb(77, 211, 204)',    
    '&:hover': {
        backgroundColor: 'rgb(135, 212, 208)'
    }
}

const LoginForm = ({ setRequestError, setIsLoading }) => {
    const { handleSubmit, register, formState: { errors } } = useForm();
    const navigate = useNavigate();
    const { setToken } = useContext(AuthContext);

    
 
    const registerInfo = async (data) => {
        setIsLoading(true);

        const response = await fetch('http://localhost:3003/login', {
            method: "POST", 
            mode: "cors", 
            cache: "no-cache", 
            credentials: "same-origin", 
            headers: {
              "Content-Type": "application/json",        
            },      
            body: JSON.stringify(data), 
          });

        setIsLoading(false);
        
        const responseData = await response.json();

        if (response.ok) {
            setToken(responseData.token);            
            navigate('/perfil');                     
            return;
        }        

        setRequestError(responseData);
    }
    

    return (
        <form className='loginForm' onSubmit={handleSubmit(registerInfo)}>
            <Typography variant="h4" component='h2' sx={h2Style}>Login</Typography>
                <div className='row'>                    
                    <TextField sx={textFieldStyle} label='E-mail'variant="standard" {...register('email', { required: true })} error={!!errors.email}/>                                     
                </div>
                <div className='row'>                        
                    <PasswordInput label='Senha' style={textFieldStyle} register={() => register('password', { required: true })} error={!!errors.password}/>                                        
                </div>
            <Button type="submit" sx={buttonStyle} variant="contained">Login</Button>
        </form>

    )
};

export default LoginForm;

