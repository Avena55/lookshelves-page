import React from "react";
import { Typography, TextField, Button } from '@mui/material';
import PasswordInput from "../../components/Password";
import { useForm } from "react-hook-form";
import { useNavigate } from 'react-router-dom'


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

const RegisterForm = ({ setRequestError, setIsLoading }) => {
    const { handleSubmit, register, setError, formState: { errors } } = useForm();
    const navigate = useNavigate();    
    
 
    const registerInfo = async (data) => {
        if (data.password !== data.repeatPassword) {
            setError('password', { type: 'validate' }, { shouldFocus: true });
            setError('repeatPassword', { type: 'validate' });
            return
        }

        setIsLoading(true);

        const response = await fetch('http://localhost:3003/cadastro', {
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

        if (response.ok) {
            navigate('/perfil');
            return;
        }
        
        const responseData = await response.json();

        setRequestError(responseData);
    }
    

    return (
        <form className='registerForm' onSubmit={handleSubmit(registerInfo)}>
            <Typography variant="h4" component='h2' sx={h2Style}>Cadastro</Typography>
                <div className='row'>
                    <TextField sx={textFieldStyle} label='Nome' variant="standard" {...register('name', { required: true })} error={!!errors.nome} />
                    <TextField sx={textFieldStyle} label='E-mail'variant="standard" {...register('email', { required: true })} error={!!errors.email}/>                                     
                </div>
                <div className='row'>                        
                    <PasswordInput label='Senha' style={textFieldStyle} register={() => register('password', { required: true })} error={!!errors.password}/>                          
                    <PasswordInput label='Repita a Senha' style={textFieldStyle} register={() => register('repeatPassword', { required: true })} error={!!errors.repeatPassword}/>                     
                </div>
            <Button type="submit" sx={buttonStyle} variant="contained">Cadastrar-se</Button>
        </form>

    )
};

export default RegisterForm;

