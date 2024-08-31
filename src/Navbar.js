import React from 'react';
import { NavLink } from 'react-router-dom';
import './App.css'; 




function Navbar() {
  return (
    <nav className="Navbar">
      <ul className="Navbar-list">
        <li className="Navbar-item">
          <NavLink 
            to="/" 
            className={({ isActive }) => isActive ? 'Navbar-link active' : 'Navbar-link'}
          >
            <span className="Navbar-text">Home</span>
          </NavLink>
        </li>
        <li className="Navbar-item">
          <NavLink 
            to="/pokemon" 
            className={({ isActive }) => isActive ? 'Navbar-link active' : 'Navbar-link'}
          >
            <span className="Navbar-text">Pokemon</span>
          </NavLink>
        </li>
        <li className="Navbar-item">
          <NavLink 
            to="/aboutme" 
            className={({ isActive }) => isActive ? 'Navbar-link active' : 'Navbar-link'}
          >
            <span className="Navbar-text">About Me</span>
          </NavLink>
        </li>
      </ul>
    </nav>
  );
}

export default Navbar;
