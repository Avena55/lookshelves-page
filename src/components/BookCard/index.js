import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import Stack from '@mui/material/Stack';
import DeleteIcon from '@mui/icons-material/Delete';
import './styles.css';

export default function BookCard( bookImg, bookTitle, comment, bookId ) {
  return (
    <Card key={bookId} className='card-box' sx={{ maxWidth: 345 }} style={{background: `url(${bookImg}) center center / cover no-repeat`}}>
      <CardMedia component='div' sx={{ height: 140 }}/>
      <CardContent className='content-box' style={{background: `linear-gradient(rgba(255, 255, 255, 0.8), rgba(224, 224, 224, 0.4))`, paddingBottom: 0}}>
        <Typography gutterBottom variant="h5" component="div">
          {bookTitle}
        </Typography>
        <Typography variant="body2" color="text.secondary" style={{paddingBottom: '24px'}}>
          {comment}
        </Typography>
        <Stack direction="row" spacing={27}>
            <Button sx={{color: 'rgba(50, 50, 50, 1)'}} size="small">Editar</Button>
            <IconButton aria-label="delete">
                <DeleteIcon />
            </IconButton>
        </Stack>
      </CardContent>
    </Card>
  );
}