import React from 'react';
import { Link } from 'react-router-dom';
import '../style.css';

function Navigation() {
  return (
    <nav>
        <Link to="/dashboard">dashboard</Link>
        <Link to="/grantdetails">grantdetails</Link>
        <Link to="/uploaddocument">uploaddocument</Link>
        <Link to="/trackgrantresearch">trackgrantresearch</Link>
        <Link to="/statistics">Statistics</Link>

    </nav>
  );
}

export default Navigation;