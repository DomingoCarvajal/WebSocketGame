// Navbar.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css'; // Importa el CSS del Navbar

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/" className="navbar-link">
          Home
        </Link>
        <Link to="/waiting-room" className="navbar-link">
          Play
        </Link>
      </div>
      {/* Quarto componente será renderizado en la ruta /quarto */}
    </nav>
  );
};

export default Navbar;

