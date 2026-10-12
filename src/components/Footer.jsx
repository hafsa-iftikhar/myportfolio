import React from 'react';
import './Footer.css';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="minimal-footer">
      <div className="footer-container">
        <div className="footer-left">
          <span className="footer-brand">HAFSA STUDIO</span>
          <span className="footer-divider">-</span>
          <span className="footer-copy">© {currentYear} ALL RIGHTS RESERVED</span>
        </div>

        <div className="footer-links">
          <a 
            href="https://github.com/hafsa-iftikhar?tab=repositories" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="footer-link"
          >
            GITHUB ↗
          </a>
          <span className="footer-dot">•</span>
          <a 
            href="https://www.linkedin.com/in/hafsa-iftikhar-3666a224b/" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="footer-link"
          >
            LINKEDIN ↗
          </a>
          <span className="footer-dot">•</span>
          <a 
            href="https://wa.me/923369387999" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="footer-link"
          >
            WHATSAPP ↗
          </a>
        </div>
      </div>
    </footer>
  );
}