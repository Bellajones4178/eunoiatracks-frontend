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
import Register from './Pages/signUp';

function App() {
  return (
    <Router>
      <Content />
    </Router>
  );
}

function Content() {
  const location = useLocation();
  const showNavigation = ["/dashboard", "/grantdetails", "/uploaddocument", "/trackgrantresearch", "/home"].includes(location.pathname);

  return (
    <main>
      {showNavigation && <Navigation />}
      <section>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/grantdetails" element={<GrantDetails />} />
          <Route path="/uploaddocument" element={<UploadDocument />} />
          <Route path="/add-grant" element={<AddGrant />} />
          <Route path="/trackgrantresearch" element={<TrackGrantResearch />} />
          <Route path="/add-potential-grant" element={<AddPotentialGrant />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Register />} />
        </Routes>
      </section>
      <footer>
        <p>© 2024 Isabella M Jones</p>
      </footer>
    </main>
  );
}

export default App;

