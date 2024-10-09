import React from 'react';
import './Navbar.css'; // Add styles as needed
import logo from './logo.jpg'; // Adjust the path if needed

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="navbar-brand">
      <img src={logo} alt="Logo" />
      </div>
      <ul className="navbar-links">
        <li><a href="#home">Home</a></li>
        <li><a href="#about">About</a></li>
        <li><a href="#contact">Contact</a></li>
      </ul>
    </nav>
  );
};

export default Navbar;
