import React from 'react';
import '../style.css';
import saltlogowhite from '../saltlogowhite.PNG';

function Header() {
  return (
    <div className="header">
      {/* Logo and Name Container */}
      <div className="brand-container">
        <img src={saltlogowhite} alt="SALT Logo" className="brand-logo" />
        <span className="brand-name">SALT Outreach Inc.</span>
      </div>

      {/* Search Bar */}
      <div className="search-container">
        <input type="text" placeholder="Search" className="search-input" />
      </div>
    </div>
  );
}

export default Header;
