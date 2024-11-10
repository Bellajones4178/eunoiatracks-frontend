import React from 'react';
import { Link } from 'react-router-dom';

function Navigation() {
  return (
    <nav>
        <Link to="/home">home</Link>
        <Link to="/dashboard">dashboard</Link>
        <Link to="/grantdetails">grantdetails</Link>
        <Link to="/uploaddocument">uploaddocument</Link>
        <Link to="/trackgrantresearch">trackgrantresearch</Link>

    </nav>
  );
}

export default Navigation;