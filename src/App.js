import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Navigation from './components/navigation';
import Home from './Pages/home';
import Dashboard from './Pages/dashboard';
import GrantDetails from './Pages/grantDetails';
import UploadDocument from './Pages/uploadDocument';
import AddGrant from './Pages/addGrant';
import TrackGrantResearch from './Pages/trackGrantResearch';
import AddPotentialGrant from './Pages/addPotentialGrant';
import Login from './Pages/login';
import Register from './Pages/register';
import EditPotentialGrant from './Pages/editPotentialGrant';
import EditGrant from './Pages/editGrants';
import GrantStatusRepoert from './Pages/statistics';

function App() {
  return (
    <Router>
      <Content />
    </Router>
  );
}

function Content() {

  // Define the login function to be passed to Login component
  const handleLogin = async ({ username, password }) => {
    try {
      const response = await fetch('http://localhost:5000/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Error! status: ${response.status} - ${errorText}`);
      }

      const data = await response.json();
      console.log("Login successful:", data);
      
      // Assuming successful login returns user data or a success flag
      return true;
    } catch (error) {
      console.error("Login failed:", error);
      return false;
    }
  };

  // Define the register function to be passed to Register component
  const handleRegister = async ({ username, password, email }) => {
    try {
      const response = await fetch('http://localhost:5000/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password, email }),
      });
  
      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Error! status: ${response.status} - ${errorText}`);
      }
  
      const data = await response.json();
      console.log("Registration successful:", data);
  
      return data;
    } catch (error) {
      console.error("Registration failed:", error);
      return null;
    }
  };

  return (
    <main>
      <section>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/grantdetails" element={<GrantDetails />} />
          <Route path="/uploaddocument" element={<UploadDocument />} />
          <Route path="/add-grant" element={<AddGrant />} />
          <Route path="/trackgrantresearch" element={<TrackGrantResearch />} />
          <Route path="/add-potential-grant" element={<AddPotentialGrant />} />
          <Route path="edit-potential-grant/:grantId" element={<EditPotentialGrant />} />
          <Route path="edit-grant/:grantId" element={<EditGrant />} />
          <Route path="/statistics" element={<GrantStatusRepoert />} />
          <Route 
            path="/login" 
            element={<Login onLogin={handleLogin} message="Please log in to continue." />} 
          />
          <Route 
            path="/register" 
            element={<Register onRegister={handleRegister} message="Please sign up to continue." />} 
          />
        </Routes>
      </section>
      <footer>
        <p>© 2024 Isabella M Jones</p>
      </footer>
    </main>
  );
}

export default App;