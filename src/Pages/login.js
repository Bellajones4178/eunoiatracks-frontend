import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Login = ({ onLogin, message }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const success = await onLogin({ username, password });
    if (success) {
      navigate('/dashboard'); // Redirect to the dashboard or another page on success
    }
  };

  return (
    <div className="landing-background">
        <div className="border">
          <div className="header">
            <h1>Login</h1>
          </div>
          <form onSubmit={handleSubmit}>
            <div className="msg">{message}</div>
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
            <input type="submit" className="btn" value="Sign In" />
          </form>
          <p className="bottom">
            Don't have an account? <Link to="/register">Sign Up here</Link>
          </p>
        </div>
      </div>
  );
};

export default Login;
