import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL || 'http://localhost:5000'}/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });

      const data = await response.json();

      if (response.ok) {
        setErrorMessage(''); // Clear any previous errors
        navigate('/dashboard'); // Redirect to the dashboard on success
      } else {
        setErrorMessage(data.error || 'Login failed. Please try again.');
      }
    } catch (error) {
      console.error('Error during login:', error);
      setErrorMessage('An unexpected error occurred. Please try again later.');
    }
  };

  return (
    <div className="landing-background">
      <div className="form-tables">
        <div className="border">
          <div style={{ textAlign: 'center' }}>
            <h1 className="center">Login</h1>
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
            <input type="submit" className="reglog-button" value="Sign In" />
          </form>
          <p className="bottom">
            Don't have an account? <Link to="/register">Sign Up here</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
