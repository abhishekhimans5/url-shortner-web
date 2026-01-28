
import React, { useContext, useEffect, useState } from 'react'
import './login.css'
import Spinner from '../Spinner/Spinner';
import { loginUser } from '../../api/loginUser';
import { validateEmail } from '../../utils/validateEmail';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import LoginContextProvider from '../../utils/LoginContextProvider';

const Login = () => {

  const {user, setUser, isLoggedIn, setIsLoggedIn} = useContext(LoginContextProvider);

  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  if(isLoggedIn) {
    return <Navigate to="/dashboard" replace />;
  }

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  }

  const handleSubmit = async(e) => {
    e.preventDefault();
    if(formData.email === '' || formData.password === '') {
      setError("Please fill all the fields");
      return;
    }else {
      if(!validateEmail(formData.email)) {
        setError("Please enter a valid email");
        return;
      }else{
        setError(null);
        setIsLoading(true)
        try {
          const result = await loginUser(formData.email, formData.password);
          setUser({
            ...user,
            name : result.data.name,
            email : result.data.email
          });
          localStorage.setItem('token', result.data.token);
          setIsLoggedIn(true);
          setIsLoading(false);
          navigate('/dashboard');
        } catch (err) {
          setError(err.response.data.message || "Login failed");
          setIsLoading(false);
        } 
      }
    }
  }
  return (
    <div className="login-box">
      <div className="login-body">
        <p className="login-txt">Login</p>
        <form className="login-form">
          <input
            type="email"
            name='email'
            className="login-input"
            placeholder="Email"
            required
            onChange={(e) => handleChange(e)}
          />
          <input
            type="password"
            name='password'
            className="login-input"
            placeholder="Password"
            required
            onChange={(e) => handleChange(e)}
          />
          <button 
            type="submit"
            className="login-btn"
            disabled={isLoading}
            onClick={(e) => handleSubmit(e)}
          >
            Sign In
          </button>
        </form>
      </div>
      <div className="login-footer">
        <p className="login-footer-txt">Don't have an account? 
          <Link to="/register" className="signup-link"> Sign Up</Link>
        </p>
        <p className="forgot-pass">Forgot Password</p>
      </div>
         {isLoading && <Spinner fullPage={false}/>}
      <div className="login-error">
        {error && <p className="error-text">{error}</p>}
      </div>
    </div>

  )
}

export default Login