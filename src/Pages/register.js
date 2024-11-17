import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';


function Register({ onRegister, message }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (typeof onRegister === 'function') { // Check if onRegister is a function
      const success = await onRegister({ username, password, email });
      if (success) {
        navigate('/login'); // Redirect to login on successful registration
      }
    } else {
      console.error("onRegister is not a function");
    }
  };

  return (
    <div className="landing-background">
    <div className="form-tables">
    <div style={{ textAlign: 'center'}}>
          <h1 className="word">Register</h1>
        </div>
        <br /><br /><br />
        <h2 className="word">
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
              type="text"
              placeholder="Enter Your Email ID"
              className="textbox"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <input type="submit" className="btn" value="Sign Up" />
            <br />
          </form>
        </h2>
        <p className="bottom">
          Already have an account? <Link className="bottom" to="/login">Sign In here</Link>
        </p>
      </div>
      </div>
  );
}

export default Register;