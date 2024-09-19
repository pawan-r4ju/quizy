import React, { useState } from 'react';
import './Navbar.css'; // Import the CSS file
import logo from '../assets/logo.png'; // Import the logo image
import { Link } from 'react-router-dom';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const handleClick = (message) => {
    alert(message);
  };

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <div className="logo">
          <Link to="/">
            <img src={logo} alt="Logo" />
          </Link>
        </div>
        <div className={`nav-links ${isOpen ? 'open' : ''}`}>
          <Link tdefault className="nav-link" onClick={() => handleClick('About button clicked')}>About</Link>
          <Link tdefault  className="nav-link" onClick={() => handleClick('Sign In button clicked')}>Sign In</Link>
          <Link tdefault  className="nav-link" onClick={() => handleClick('Sign Up button clicked')}>Sign Up</Link>
        </div>
        <div className="hamburger" onClick={toggleMenu}>
          <div className="bar"></div>
          <div className="bar"></div>
          <div className="bar"></div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar