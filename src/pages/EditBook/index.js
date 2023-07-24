import React, { useState, useContext, useEffect } from "react";
import { Card, Backdrop, CircularProgress, Snackbar} from '@mui/material';
import MuiAlert from '@mui/material/Alert';
import EditBookForm from "../../components/EditBookForm";
import { useParams } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";


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

const EditBook = () => {
    const { token } = useContext(AuthContext);
    const [bookInfo, setBookInfo] = useState('');
    const [hasInfoLoaded, setHasInfoLoaded] = useState(false);
    const { id } = useParams();

    const getBook = async () => {
        const response = await fetch(`http://localhost:3003/livro/${id}`, {
        method: "GET",
        headers: {
            "Authorization": `Bearer ${token}`
        }
      });

        const data = await response.json();
        setBookInfo(data);
        setHasInfoLoaded(true); 
    }

    useEffect(() => {        
        getBook();      
    }, []);

    const [requestMessage, setRequestMessage] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const handleClose = () => {
        setRequestMessage('');
    }

    return (    
        <div className="container">           
            <Card sx={cardStyle}>
                <EditBookForm setRequestMessage={setRequestMessage} setIsLoading={setIsLoading} bookInfo={bookInfo} hasInfoLoaded={hasInfoLoaded} />                     
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

export default EditBook;