import React from 'react';
import './Footer.css'; // Add styles as needed

const Footer = () => {
  return (
    <footer className="footer">
      <p>&copy; {new Date().getFullYear()} Image Analysis with AI. All rights reserved.</p>
      <div className="footer-links">
        <a href="#privacy">Privacy Policy</a>
        <a href="#terms">Terms of Service</a>
      </div>
    </footer>
  );
};

export default Footer;
