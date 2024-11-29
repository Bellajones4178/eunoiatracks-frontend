import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

function Register({ onRegister, message }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (typeof onRegister === 'function') {
      const success = await onRegister({ username, password, email });
      if (success) {
        navigate('/login'); // Redirect to login on successful registration
      }
    } else {
      console.error('onRegister is not a function');
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
