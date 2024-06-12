import React, { useState } from 'react';
import { Container, TextField, Button, Typography } from '@mui/material';
import Swal from 'sweetalert2';
import CardGameOfThrones from './CardGameOfThrones';

const SpecificSearch = () => {
  const [characterId, setCharacterId] = useState('');
  const [character, setCharacter] = useState(null);

  const handleSearch = () => {
    fetch(`https://thronesapi.com/api/v2/Characters/${characterId}`)
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        setCharacter(data);
        Swal.fire({
          icon: 'success',
          title: 'Encontrado',
          text: 'Personaje encontrado con éxito.',
        });
      })
      .catch(error => {
        setCharacter(null);
        Swal.fire({
          icon: 'error',
          title: 'No encontrado',
          text: 'No se encontró el personaje con el ID proporcionado.',
        });
        console.error('Error fetching data:', error);
      });
  };

  return (
    <Container maxWidth="md" style={{fontFamily:'sans-serif',minHeight:"500px", marginTop: '50px', textAlign: 'center' }}>
      <Typography variant="h2" sx={{fontFamily:'sans-serif', color: '#fda80d' }} gutterBottom>
        Búsqueda Específica de Personaje
      </Typography>
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginBottom: '20px' }}>
        <TextField
          label="ID del Personaje"
          variant="outlined"
          value={characterId}
          onChange={e => setCharacterId(e.target.value)}
          style={{  backgroundColor:'white',color:'black',marginRight: '20px' }}
        />
        <Button variant="contained" color="primary" onClick={handleSearch}>
          Buscar
        </Button>
      </div>
      {character && (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginTop: '20px' }}>
          <CardGameOfThrones character={character} />
        </div>
      )}
    </Container>
  );
};

export default SpecificSearch;
