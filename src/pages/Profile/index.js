import React, { useContext, useEffect, useState } from "react"
import { AuthContext } from "../../context/AuthContext";
import './styles.css';
import { useNavigate } from "react-router-dom";
import BookCard from "../../components/BookCard";


const Profile = () => {
    const { token, setToken } = useContext(AuthContext);
    const [name, setName] = useState('username');
    const [books, setBooks] = useState([]);
    const [bookToBeDeleted, setBookToBeDeleted] = useState();
    const navigate = useNavigate();

    const [open, setOpen] = useState(false);


    const handleClickOpen = (bookId) => {
        setBookToBeDeleted(bookId)
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const getUser = async () => {
        const response = await fetch('http://localhost:3003/usuario', {
        method: "GET",
        headers: {
            "Authorization": `Bearer ${token}`
        }
      });

        const data = await response.json();
        setName(data.nome);        

    }

    const getShelf = async () => {
        const response = await fetch('http://localhost:3003/estante', {
        method: "GET",
        headers: {
            "Authorization": `Bearer ${token}`
        }
        });

        const data = await response.json();

        const formattedBooks = [];

        for (const book of data) {
            formattedBooks.push({
            title: book.title,
            rating: book.rating,
            comment: book.comment,
            id: book.id,
            cover: book.cover
            });        
        }

        const sortedBooks = formattedBooks.sort((a, b) => (a.id > b.id) ? 1 : -1);
        setBooks(sortedBooks);

    }

    useEffect(() => {        
        getUser();
        getShelf();
        
    }, []);

    const handleDeleteBook = async (bookToBeDeleted, token) => {
        await fetch(`http://localhost:3003/livro/${bookToBeDeleted}`, {
          method: "DELETE",
          headers: {
              "Authorization": `Bearer ${token}`
          }, 
      });
      
      getShelf();
      setOpen(false);
    
    }

    const handleLogout = () => {
        setToken('');
        navigate('/')
    }

    return (
        <div className="shelf">
            <h1>Estante de {name}</h1>
            <button onClick={handleLogout}>Sair</button>
            <button onClick={() => navigate('/registrarlivro')}>Adicionar Livro</button>
            <div className="book-grid">
                {books.map(book => (
                    BookCard(book.cover, book.title, book.comment, book.id, handleDeleteBook, token, book.rating, open, handleClose, handleClickOpen, bookToBeDeleted, navigate)
                ))}
            </div>
        </div>
    )
}

export default Profile;