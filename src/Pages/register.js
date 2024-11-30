import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

function Register() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL || 'http://localhost:5000'}/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password, email }),
      });

      const data = await response.json();

      if (response.ok) {
        setErrorMessage(''); // Clear any previous errors
        navigate('/login'); // Redirect to login page on successful registration
      } else {
        setErrorMessage(data.error || 'Registration failed. Please try again.');
      }
    } catch (error) {
      console.error('Error during registration:', error);
      setErrorMessage('An unexpected error occurred. Please try again later.');
    }
  };

  return (
    <div className="landing-background">
      <div className="form-tables">
        <div className="border">
          <div style={{ textAlign: 'center' }}>
            <h1 className="center">Register</h1>
            <br />
          </div>
          <form onSubmit={handleSubmit}>
            {errorMessage && <div className="msg error">{errorMessage}</div>}
            <input
              id="username"
              name="username"
              type="text"
              placeholder="Enter Your Username"
              className="textbox"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <input
              id="password"
              name="password"
              type="password"
              placeholder="Enter Your Password"
              className="textbox"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <input
              id="email"
              name="email"
              type="email"
              placeholder="Enter Your Email ID"
              className="textbox"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <input type="submit" className="reglog-button" value="Sign Up" />
          </form>
          <p className="bottom">
            Already have an account? <Link to="/login">Sign In here</Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Register;
