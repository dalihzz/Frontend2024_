import React, { useState, useEffect } from 'react';
import Swal from 'sweetalert2';
import './Card.css';
import img from "../assets/gamico.png"
const CardGameOfThrones = ({ character }) => {
  const [isSaved, setIsSaved] = useState(false);

  useEffect(() => {
    const savedCharacters = JSON.parse(localStorage.getItem('savedCharacters')) || [];
    const characterExists = savedCharacters.find(savedCharacter => savedCharacter.id === character.id);
    setIsSaved(!!characterExists);
  }, [character.id]);

  const handleSaveClick = (event) => {
    event.stopPropagation();
    if (isSaved) {
      Swal.fire({
        title: '¿Deseas eliminar este personaje guardado?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Sí, eliminar',
        cancelButtonText: 'No, cancelar',
      }).then((result) => {
        if (result.isConfirmed) {
          const savedCharacters = JSON.parse(localStorage.getItem('savedCharacters')) || [];
          const newSavedCharacters = savedCharacters.filter(savedCharacter => savedCharacter.id !== character.id);
          localStorage.setItem('savedCharacters', JSON.stringify(newSavedCharacters));
          setIsSaved(false);
          Swal.fire('Eliminado', 'El personaje ha sido eliminado', 'success');
        }
      });
    } else {
      Swal.fire({
        title: '¿Deseas guardar este personaje?',
        icon: 'question',
        showCancelButton: true,
        confirmButtonText: 'Sí, guardar',
        cancelButtonText: 'No, cancelar',
      }).then((result) => {
        if (result.isConfirmed) {
          const savedCharacters = JSON.parse(localStorage.getItem('savedCharacters')) || [];
          savedCharacters.push(character);
          localStorage.setItem('savedCharacters', JSON.stringify(savedCharacters));
          setIsSaved(true);
          Swal.fire('Guardado', 'El personaje ha sido guardado', 'success');
        }
      });
    }
  };

  return (
    <div className='fondo1'>
    <div className="card-container">
      <div  className="hero-image-container">
        <img className="hero-image" src={character.imageUrl} alt={character.fullName} />
      </div>
      <main className="main-content">
        <h1>{character.fullName}</h1>
        
        <div className="flex-row">
          <div className="coin-base">
            <img src="https://i.postimg.cc/T1F1K0bW/Ethereum.png" alt="Ethereum" className="small-image" />
            <p>Familia: {character.family}</p>
          </div>
          <div className="time-left">
            
            <button 
        className={`save-button ${isSaved ? 'saved' : 'not-saved'}`} 
        onClick={handleSaveClick}
      >
        {isSaved ? 'Eliminar' : 'Guardar'}
      </button>
      
          </div>
        </div>
        
      </main>
      <div className="card-attribute">
        <img src={img} alt="avatar" className="small-avatar" />
        <h2>{character.title}</h2>
      </div>
      
    </div></div>
  );
};

export default CardGameOfThrones;
