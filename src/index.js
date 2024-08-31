import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './index.css';
import Navbar from './Navbar';
import Home from './Home';
import PokemonList from './PokemonList';
import PokemonDetail from './PokemonDetail';
import AboutMe from './AboutMe';

ReactDOM.render(
  <Router>
    <Navbar />
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/pokemon" element={<PokemonList />} />
      <Route path="/pokemon/:name" element={<PokemonDetail />} />
      <Route path="/aboutme" element={<AboutMe />} />
    </Routes>
  </Router>,
  document.getElementById('root')
);
