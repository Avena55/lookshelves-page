import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import Stack from '@mui/material/Stack';
import DeleteIcon from '@mui/icons-material/Delete';
import Rating from '@mui/material/Rating';
import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import './styles.css';

const StyledRating = styled(Rating)({
  '& .MuiRating-iconFilled': {
    color: '#2d2d2d',
  },
});

export default function BookCard( bookImg, bookTitle, comment, bookId, handleDeleteBook, token, bookRating, open, handleClose, handleClickOpen, bookToBeDeleted, navigate ) {
  return (
    <Card key={bookId} className='card-box' sx={{ maxWidth: 345 }} style={{background: `url(${bookImg}) center center / cover no-repeat`}}>
      <CardMedia component='div' sx={{ minHeight: 80 }}/>
      <CardContent className='content-box' style={{background: `linear-gradient(rgba(255, 255, 255, 0.8), rgba(224, 224, 224, 0.4))`, paddingBottom: 0}}>
        <Typography gutterBottom variant="h5" component="div" sx={{ minHeight: 80, maxHeight: 80 }}>
          {bookTitle}
        </Typography>
        <Typography variant="body2" color="text.secondary" style={{paddingBottom: '24px'}} sx={{ minHeight: 80 }}>
          {comment}
        </Typography>
        <Stack direction='row' spacing={0}>
          <StyledRating defaultValue={Number(bookRating/2)} precision={0.5} readOnly max={5} />
          <Typography variant="caption">
          {bookRating}
        </Typography>
        </Stack>
        <Stack direction="row" spacing={27}>
            <Button sx={{color: 'rgba(50, 50, 50, 1)'}} size="small" onClick={() => navigate(`/editarlivro/${bookId}`)} >Editar</Button>
            <IconButton onClick={() => handleClickOpen(bookId)}>
                <DeleteIcon />
            </IconButton>
        </Stack>
      </CardContent>
      <Dialog
        open={open}
        onClose={handleClose}
      >
        <DialogTitle>
          Deletar Livro
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            Deseja realmente deletar este livro?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => handleClose()}>Cancelar</Button>
          <Button onClick={() => handleDeleteBook(bookToBeDeleted, token)}>
            Deletar
          </Button>
        </DialogActions>
      </Dialog>
    </Card>
  );
}