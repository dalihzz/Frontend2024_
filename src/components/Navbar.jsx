// src/components/Navbar.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import { AppBar, Toolbar, Typography, Button } from '@mui/material';

const Navbar = () => {
  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" sx={{fontFamily:'serif', flexGrow: 1 }}>
          Game of Thrones
        </Typography>
        <Button color="inherit" component={Link} to="/characters">
          Personajes
        </Button>
        <Button color="inherit" component={Link} to="/character-search">
          Búsqueda Específica
        </Button>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
