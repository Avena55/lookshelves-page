import React, {  useContext, useEffect } from "react";
import { Typography, TextField, Button } from '@mui/material';
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from 'react-router-dom'
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

const EditBookForm = ({ setRequestMessage, setIsLoading, bookInfo, hasInfoLoaded }) => {
    const { token } = useContext(AuthContext);
    const { handleSubmit, register, formState: { errors }, setValue } = useForm();
    const navigate = useNavigate();
    const { id } = useParams();
    
    const updateBookInfo = async (data) => {
        setIsLoading(true);

        const response = await fetch(`http://localhost:3003/livro/${id}`, {
            method: "PATCH", 
            mode: "cors", 
            cache: "no-cache", 
            credentials: "same-origin", 
            headers: {
                "Authorization": `Bearer ${token}`,
                "Content-Type": "application/json"
            },      
            body: JSON.stringify(data),
      });

        setIsLoading(false);

        if (response.ok) {
             navigate('/perfil');
             return;
        }
        
        const responseData = await response.json();

        setRequestMessage(responseData);
    }

    useEffect(() => {        
        setValue('rating', bookInfo.rating);
        setValue('comment', bookInfo.comment);
        setValue('bookIsbn', bookInfo.isbn);
        setValue('bookTitle', bookInfo.title);
              
    }, [hasInfoLoaded]);    

    return (
        <>
            <form className='registerForm' onSubmit={handleSubmit(updateBookInfo)}>
                <Typography variant="h4" component='h2' sx={h2Style}>Editar Livro</Typography>
                    <div className='row'>
                        <TextField sx={textFieldStyle} inputProps={{ readOnly: true }} InputLabelProps={{ shrink: true }}  label='ISBN' variant="standard" placeholder="Código ISBN-13 do Livro." {...register('bookIsbn', { required: true })} />
                        <TextField sx={textFieldStyle} inputProps={{ readOnly: true }} label='Título'variant="standard" InputLabelProps={{ shrink: true }} {...register('bookTitle', { required: true })} />                                     
                    </div>
                    <div className='row'>                        
                        <TextField
                            sx={textFieldStyle}
                            label='Comentário'
                            placeholder='Comentário curto sobre o livro (Limite de 140 caracteres)'
                            multiline
                            rows={3}
                            variant="standard"
                            InputLabelProps={{ shrink: true }}
                            inputProps={{ maxLength: 140 }}
                            {...register('comment', { required: false })} error={!!errors.comment}
                        />
                        <TextField sx={textFieldStyle} InputLabelProps={{ shrink: true }} type='number' inputProps={{ min: 0, max: 10 }} placeholder='De 0 a 10' label='Nota'variant="standard" {...register('rating', { required: true })} error={!!errors.rating}/>                       
                    </div>
                <Button type="submit" sx={buttonStyle} variant="contained">Editar Livro</Button>
            </form>
                <img src={bookInfo.cover} alt='' className='book-cover' />
        </>
    )
};

export default EditBookForm;

