import React, { useEffect, useState, useContext } from "react";
import { Typography, TextField, Button } from '@mui/material';
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

const RegisterBookForm = ({ setRequestError, setIsLoading }) => {
    const { token } = useContext(AuthContext);
    const { handleSubmit, register, setError, formState: { errors }, watch, setValue, formState } = useForm();
    const navigate = useNavigate();
    let isbnWatch = watch('isbn', '');
    const [imgUrl, setImgUrl] = useState('https://bookstoreromanceday.org/wp-content/uploads/2020/08/book-cover-placeholder.png');
    const [shrinkTitle, setShrinkTitle] = useState(false);
    const [readOnlyTitle, setReadOnlyTitle] = useState(true);

    useEffect(() => {
            if (isbnWatch.length >= 13) {
                handleFetchInfoUsingIsbn();
                setShrinkTitle(true);
            } else {
                setImgUrl('https://bookstoreromanceday.org/wp-content/uploads/2020/08/book-cover-placeholder.png');
                setValue('bookTitle', '', { shouldValidate: false });
                setShrinkTitle(false);
            }
        
    }, [isbnWatch]);

    const handleFetchInfoUsingIsbn = async () => {
        try {
          setIsLoading(true)
          const response = await fetch(`https://openlibrary.org/search.json?q=${isbnWatch}.json`);
          const { docs } = await response.json();
          setIsLoading(false);
    
          setValue('bookTitle', docs[0].title, { shouldValidate: true });
          setImgUrl(`https://covers.openlibrary.org/b/isbn/${isbnWatch}-L.jpg`);
    
        } catch (error) {
          setRequestError('Servidor Indisponível. Registro Manual Autorizado.')
          setIsLoading(false);
          setReadOnlyTitle(false);          
          
        }    
    }  
    
    const registerBookInfo = async (data) => {
        setIsLoading(true);

        const response = await fetch('http://localhost:3003/livro', {
            method: "POST", 
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

        setRequestError(responseData);
    }
    

    return (
        <>
            <form className='registerForm' onSubmit={handleSubmit(registerBookInfo)}>
                <Typography variant="h4" component='h2' sx={h2Style}>Cadastrar Livro</Typography>
                    <div className='row'>
                        <TextField sx={textFieldStyle} inputProps={{ maxLength: 13 }} label='ISBN' variant="standard" placeholder="Código ISBN-13 do Livro." {...register('isbn', { required: true })} error={!!errors.isbn} />
                        <TextField sx={textFieldStyle} InputProps={{ readOnly: readOnlyTitle }} InputLabelProps={{ shrink: shrinkTitle }} label='Título'variant="standard" {...register('bookTitle', { required: true })} error={!!errors.title}/>                                     
                    </div>
                    <div className='row'>                        
                        <TextField
                            sx={textFieldStyle}
                            label='Comentário'
                            placeholder='Comentário curto sobre o livro (Limite de 140 caracteres)'
                            multiline
                            rows={3}
                            variant="standard"
                            inputProps={{ maxLength: 140 }}
                            {...register('comment', { required: false })} error={!!errors.comment}
                        />
                        <TextField sx={textFieldStyle} type='number' inputProps={{ min: 0, max: 10 }} placeholder='De 0 a 10' label='Nota'variant="standard" {...register('rating', { required: true })} error={!!errors.rating}/>                       
                    </div>
                <Button type="submit" sx={buttonStyle} variant="contained">Cadastrar Livro</Button>
            </form>
                <img src={imgUrl} alt='' className='book-cover' />
        </>
    )
};

export default RegisterBookForm;

