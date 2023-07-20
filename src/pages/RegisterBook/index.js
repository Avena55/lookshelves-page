import React, { useState } from "react";
import { Card, Backdrop, CircularProgress, Snackbar} from '@mui/material';
import MuiAlert from '@mui/material/Alert';
import './styles.css';
import RegisterBookForm from "../../components/RegisterBookForm";



const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
  });

  const cardStyle = {
    display: 'flex',
    maxWidth: '800px',        
    borderRadius: '16px',
    boxShadow: "0px 8px 9px -5px rgba(0, 0, 0, 0.2), 0px 15px 22px 2px rgba(0, 0, 0, 0.14), 0px 6px 28px 5px rgba(0, 0, 0, 0.12)",
    padding: '42px 60px 60px 60px',
}

const RegisterBook = () => {    
    const [requestMessage, setRequestMessage] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const handleClose = () => {
        setRequestMessage('');
    }

    return (    
        <div className="container">           
            <Card sx={cardStyle}>
                <RegisterBookForm setRequestMessage={setRequestMessage} setIsLoading={setIsLoading} />                     
            </Card>
            <Backdrop sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }} open={isLoading}>
                <CircularProgress color="inherit" />
            </Backdrop>
            <Snackbar open={!!requestMessage} autoHideDuration={6000} anchorOrigin={{vertical: "bottom", horizontal: "center"}} onClose={handleClose}>
                <Alert severity="error" sx={{ width: '100%' }} onClose={handleClose}>
                            {requestMessage}
                </Alert>
            </Snackbar>        
        </div>                 
    )
}

export default RegisterBook;