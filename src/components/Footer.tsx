import React from 'react';
import './Footer.css';

const Footer: React.FC = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-section">
          <h4>À propos</h4>
          <p>Real Estate Scraper - Trouvez votre bien immobilier idéal</p>
        </div>
        <div className="footer-section">
          <h4>Liens utiles</h4>
          <ul>
            <li><a href="#api">API Documentation</a></li>
            <li><a href="#github">GitHub</a></li>
            <li><a href="#contact">Contact</a></li>
          </ul>
        </div>
        <div className="footer-section">
          <h4>Nous contacter</h4>
          <p>Email: info@realestate-scraper.com</p>
          <p>Téléphone: +33 1 23 45 67 89</p>
        </div>
      </div>
      <div className="footer-bottom">
        <p>&copy; 2026 Real Estate Scraper. Tous droits réservés.</p>
      </div>
    </footer>
  );
};

export default Footer;
