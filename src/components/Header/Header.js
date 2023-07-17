import React from "react";
import { Card, Typography } from '@mui/material';
import logo from './logobooks.PNG';
import './styles.css';

const headerStyle = {
    display: 'flex',
    alignItems: 'center',
    backgroundColor: '#2d2d2d',
    borderRadius: '0px',
    height: '70px',
    boxShadow: "0px 15px 22px 2px rgba(0, 0, 0, 0.14)"    
}

const titleStyle = {
    color: 'rgb(77, 211, 204)',
    fontSize: '22px'
}


const Header = () => {
    return (
        <Card sx={headerStyle}>
        <img src={logo} alt="lookshelf logo" />
        <Typography sx={titleStyle} >.lookshelf</Typography>
        </Card> 
    ) 
};

export default Header;