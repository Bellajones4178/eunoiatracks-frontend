import React from 'react';
import { Link } from 'react-router-dom';
import '../style.css';

function Navigation() {
  return (
    <nav>
        <Link to="/dashboard">Dashboard</Link>
        <Link to="/grantdetails">Grant Details</Link>
        <Link to="/uploaddocument">Documents</Link>
        <Link to="/trackgrantresearch">Grant Research</Link>
        <Link to="/statistics">Statistics</Link>

    </nav>
  );
}

export default Navigation;