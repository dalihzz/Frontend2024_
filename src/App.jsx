import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import CardsContainerGameOfThrones from './components/CardsContainerGameOfThrones';
import SpecificSearch from './components/SpecificSearch';
import './App.css'; 
function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/characters" element={<CardsContainerGameOfThrones />} />
        <Route path="/character-search" element={<SpecificSearch />} />
        <Route path="/"  element={<CardsContainerGameOfThrones />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
