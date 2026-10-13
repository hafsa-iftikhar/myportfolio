import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './Header.css';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const closeMenu = () => setIsMenuOpen(false);

  return (
    <header className={`portfolio-header ${isScrolled ? 'scrolled' : ''}`}>
      <nav className="nav-container">

        {/* Left Links */}
        <div className={`nav-links left ${isMenuOpen ? 'active' : ''}`}>
          <Link to="/about" onClick={closeMenu}>ABOUT</Link>
          <Link to="/services" onClick={closeMenu}>SERVICES</Link>
          <Link to="/portfolio" onClick={closeMenu}>PORTFOLIO</Link>
          <Link to="/contact" onClick={closeMenu}>CONTACT</Link>
        </div>

        {/* Center Logo */}
        <div className="nav-logo">
          <Link to="/" onClick={closeMenu}>
            HAFSA<span>.</span>
          </Link>
        </div>

        {/* Right Links */}
        <div className={`nav-links right ${isMenuOpen ? 'active' : ''}`}>
           <a 
           href="/images/mycv.pdf" 
           target="_blank" 
           rel="noopener noreferrer" 
           className="cv-btn"
           onClick={closeMenu}
          >
           MY CV
          </a>
        </div>

        {/* Mobile Menu Button */}
        <button
          className={`mobile-menu-toggle ${isMenuOpen ? 'open' : ''}`}
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label="Toggle Navigation"
        >
          <span></span>
          <span></span>
          <span></span>
        </button>

      </nav>
    </header>
  );
}