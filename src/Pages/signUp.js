import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

// Template code for the Registration page
// ----------------------
// This template is modeled after the login component
// found at https://clerk.com/blog/building-a-react-login-page-template


const Register = (props) => {
  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [usernameError, setUsernameError] = useState('')
  const [emailError, setEmailError] = useState('')
  const [passwordError, setPasswordError] = useState('')
  const [confirmPasswordError, setConfirmPasswordError] = useState('')

  const navigate = useNavigate()

  const onRegisterClick = async () => {
    // Reset any previous errors
    setUsernameError('')
    setEmailError('')
    setPasswordError('')
    setConfirmPasswordError('')

    // Basic validation
    if (password !== confirmPassword) {
      setConfirmPasswordError('Passwords do not match')
      return
    }

    // Make a request to the backend
    try {
      const response = await fetch('http://localhost:5000/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, email, password }),
      })

      const data = await response.json()
      if (response.ok) {
        // Handle successful registration (e.g., redirect to login or dashboard)
        console.log('User registered:', data)
        navigate('/login')
      } else {
        // Handle errors
        if (data.error.includes('username')) {
          setUsernameError(data.error)
        } else if (data.error.includes('email')) {
          setEmailError(data.error)
        } else {
          console.error('Error registering user:', data.error)
        }
      }
    } catch (error) {
      console.error('Request failed:', error)
    }
  }

  return (
    <div className={'mainContainer'}>
      <div className={'titleContainer'}>
        <div>Register</div>
      </div>
      <br />
      <div className={'inputContainer'}>
        <input
          value={username}
          placeholder="Enter your username here"
          onChange={(ev) => setUsername(ev.target.value)}
          className={'inputBox'}
        />
        <label className="errorLabel">{usernameError}</label>
      </div>
      <br />
      <div className={'inputContainer'}>
        <input
          value={email}
          placeholder="Enter your email here"
          onChange={(ev) => setEmail(ev.target.value)}
          className={'inputBox'}
        />
        <label className="errorLabel">{emailError}</label>
      </div>
      <br />
      <div className={'inputContainer'}>
        <input
          type="password"
          value={password}
          placeholder="Enter your password here"
          onChange={(ev) => setPassword(ev.target.value)}
          className={'inputBox'}
        />
        <label className="errorLabel">{passwordError}</label>
      </div>
      <br />
      <div className={'inputContainer'}>
        <input
          type="password"
          value={confirmPassword}
          placeholder="Confirm your password"
          onChange={(ev) => setConfirmPassword(ev.target.value)}
          className={'inputBox'}
        />
        <label className="errorLabel">{confirmPasswordError}</label>
      </div>
      <br />
      <div className={'inputContainer'}>
        <input
          className={'inputButton'}
          type="button"
          onClick={onRegisterClick}
          value={'Register'}
        />
      </div>
    </div>
  )
}

export default Register