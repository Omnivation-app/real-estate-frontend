import React from 'react';
import './Header.css';

const Header: React.FC = () => {
  return (
    <header className="header">
      <div className="header-content">
        <div className="logo">
          <h1>🏠 Real Estate Scraper</h1>
        </div>
        <nav className="nav">
          <a href="#home">Accueil</a>
          <a href="#listings">Annonces</a>
          <a href="#about">À propos</a>
          <a href="#contact">Contact</a>
        </nav>
      </div>
    </header>
  );
};

export default Header;
