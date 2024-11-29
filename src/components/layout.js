import React, { useState } from 'react';
import Navigation from './navigation';
import Header from './header';
import '../style.css'; 
import logo from '../logo.png';
import { Link } from 'react-router-dom';

function Layout({ children }) {
  const [searchQuery, setSearchQuery] = useState(''); // State to store search input

  // Handler to update the global search query
  const handleSearch = (query) => {
    setSearchQuery(query.toLowerCase()); // Normalize the search query
  };

  return (
    <div>
      {/* Pass the search handler to the Header */}
      <Header onSearch={handleSearch} />

      <div style={{ display: 'flex' }}>
        {/* Sidebar Navigation */}
        <div className="side-nav">
          <Link to="/dashboard" className="logo"> {/* Replace a with Link */}
            <img src={logo} alt="logo" />
            <h1 className="roboto-bold">Eunoia</h1>
          </Link>
          <Navigation />
        </div>

        {/* Main Content Area */}
        <div className="dashboard-content">
          {/* Pass searchQuery as a prop to children */}
          {React.cloneElement(children, { searchQuery })}
        </div>
      </div>
    </div>
  );
}

export default Layout;
