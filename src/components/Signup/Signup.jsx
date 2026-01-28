import React, { useContext, useEffect, useState } from 'react';
import Spinner from './../Spinner/Spinner';
import { validateEmail } from '../../utils/validateEmail';
import { registerUser } from '../../api/registerUser';
import { useNavigate } from 'react-router-dom';
import LoginContextProvider from '../../utils/LoginContextProvider';

const Signup = () => {
  const [formData, setFormData] = useState({ name: '', email: '', password: '' });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const {isLoggedIn, setIsLoggedIn} = useContext(LoginContextProvider);
  const navigate = useNavigate();

  useEffect(() => {
    if(isLoggedIn) {
      navigate('/dashboard');
    }
  }, [isLoggedIn, navigate]);
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if(formData.name === '' || formData.email === '' || formData.password === '') {
      setError("Please fill all the fields");
      return;
    }else{
        if(!validateEmail(formData.email)) {
          setError("Please enter a valid email");
          return;
        }else if(formData.password.length < 6){
          setError("Password must be at least 6 characters long");
          return;
        }else if(formData.name.length < 4){
          setError("Name must be at least 4 characters long");
          return;
        }else{
          setError(null);
          setIsLoading(true);
          try {
            const response = await registerUser(formData.name, formData.email, formData.password);
            console.log("Registration successful:", response);
            alert(response.data)
            setIsLoading(false);
          } catch (error) {
            setError(error.response.data.message || "Registration failed");
            setIsLoading(false);
          }
        }
    }
  };

  const styles = {
    container: {
      maxWidth: '380px',
      margin: '100px auto',
      padding: '2.5rem',
      backgroundColor: '#ffffff',
      borderRadius: '8px',
      boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
      fontFamily: 'sans-serif'
    },
    title: {
      fontSize: '1.5rem',
      fontWeight: 'bold',
      textAlign: 'center',
      margin: '0 0 2rem 0',
      color: '#1f2937'
    },
    form: {
      display: 'flex',
      flexDirection: 'column'
    },
    input: {
      padding: '10px',
      marginBottom: '1.25rem',
      border: '1px solid #d1d5db',
      borderRadius: '4px',
      fontSize: '1rem'
    },
    button: {
      backgroundColor: '#2563eb',
      color: '#fff',
      padding: '12px',
      border: 'none',
      borderRadius: '4px',
      fontSize: '1rem',
      fontWeight: '600',
      cursor: 'pointer',
      opacity: isLoading ? 0.7 : 1
    },
    footer: {
      marginTop: '2rem',
      textAlign: 'center',
      fontSize: '0.85rem',
      color: '#6b7280'
    },
    link: {
      color: '#2563eb',
      textDecoration: 'none',
      fontWeight: '600'
    },
    error: {
      color: 'red',
      marginTop: '10px',
      height : '20px',
      textAlign: 'center'
    }
  };

  return (
    <div style={styles.container}>
      <p style={styles.title}>Create Account</p>
      <form style={styles.form} onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          style={styles.input}
          placeholder="Full Name"
          required
          onChange={handleChange}
        />
        <input
          type="email"
          name="email"
          style={styles.input}
          placeholder="Email Address"
          required
          onChange={handleChange}
        />
        <input
          type="password"
          name="password"
          style={styles.input}
          placeholder="Password"
          required
          onChange={handleChange}
        />
        <button 
          type="submit" 
          style={styles.button}
          disabled={isLoading}
          onClick={handleSubmit}
        >
          Sign Up
        </button>
      </form>
      <div style={styles.footer}>
        Already have an account? <a href="/login" style={styles.link}>Login</a>
      </div>
      {isLoading && <Spinner fullPage={false}/>}
      {error && <p style={styles.error}>{error}</p>}
    </div>
  );
};

export default Signup;