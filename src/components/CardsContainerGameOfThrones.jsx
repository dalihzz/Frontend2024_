import React, { useEffect, useState } from 'react';
import { Container, Grid, Typography, TextField, FormControlLabel, Switch, Button } from '@mui/material';
import CardGameOfThrones from './CardGameOfThrones';

const CardsContainerGameOfThrones = () => {
  const [characters, setCharacters] = useState([]);
  const [filteredCharacters, setFilteredCharacters] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [showSaved, setShowSaved] = useState(false);

  useEffect(() => {
    fetch('https://thronesapi.com/api/v2/Characters')
      .then(response => response.json())
      .then(data => setCharacters(data))
      .catch(error => console.error('Error fetching data:', error));
  }, []);

  useEffect(() => {
    filterCharacters();
  }, [characters, searchTerm, showSaved]);

  const filterCharacters = () => {
    const savedCharacters = JSON.parse(localStorage.getItem('savedCharacters')) || [];
    let displayedCharacters = showSaved ? savedCharacters : characters;

    const filtered = displayedCharacters.filter(character =>
      character.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      character.id.toString().includes(searchTerm) ||
      character.family.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredCharacters(filtered);
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleSwitchChange = () => {
    setShowSaved(prev => !prev);
  };

  const handleSearchClick = () => {
    filterCharacters();
  };

  return (
    <Container maxWidth="md"  style={{fontFamily:'serif', minHeight:"500px", marginTop: '50px', textAlign: 'center' }}>
      <Typography variant="h2" sx={{ fontFamily:'serif',color: '#fc0000' }} gutterBottom>
        Game of Thrones Characters
      </Typography>
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginBottom: '20px' }}>
        <TextField
          label="Buscar"
          variant="outlined"
          value={searchTerm}
          onChange={handleSearchChange}
          style={{  backgroundColor:'white',color:'black',marginRight: '20px' }}
        />
        
        <FormControlLabel
          control={
            <Switch
              checked={showSaved}
              onChange={handleSwitchChange}
              color="primary"
            />
          }
          label="Guardados"sx={{ color: 'white' }}
        />
      </div>
      <Grid container spacing={3}>
        {filteredCharacters.map(character => (
          <Grid item xs={12} sm={6} md={4} key={character.id}>
            <CardGameOfThrones character={character} />
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default CardsContainerGameOfThrones;
