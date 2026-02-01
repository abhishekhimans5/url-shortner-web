import React, { useContext, useState } from 'react';
import './navbar.css';
import { Link } from 'react-router-dom';
import LoginContextProvider from '../../utils/LoginContextProvider';
import { APP_NAME, LINK_TEXT } from '../../constants';

const Navbar = () => {

    const {isLoggedIn, setIsLoggedIn,user,setUser} = useContext(LoginContextProvider);
    const [showDropdown, setShowDropdown] = useState(false);

  return (
    <nav className="navbar">
      <div className="nav-container">
        <div className="nav-logo">
          <Link to="/" >{APP_NAME.fName} <span className="logo-text">{APP_NAME.lName}</span></Link> 
        </div>

        <ul className="nav-links">
          <Link to="/dashboard" ><li>{LINK_TEXT.find(item => item.path === '/dashboard')?.text}</li></Link>
          <Link to="/create-link"><li>{LINK_TEXT.find(item => item.path === '/create-link')?.text}</li></Link>
        </ul>

        {isLoggedIn && user ? (
        <div className="nav-profile">
          <div 
            className="profile-trigger" 
            onClick={() => setShowDropdown(!showDropdown)}
          >
            <div className="nav-avatar">
              {user?.name?.charAt(0).toUpperCase() || 'U'}
            </div>
          </div>

          {showDropdown && (
            <div className="nav-dropdown">
              <div className="dropdown-info">
                <p className="user-name">{user?.name || 'User'}</p>
                <p className="user-email">{user?.email || 'user@example.com'}</p>
              </div>
              <hr />
                <Link to="/profile" className="dropdown-link">Profile</Link>
              <button className="logout-btn"
                onClick={() => {
                  localStorage.removeItem('token');
                  setIsLoggedIn(false);
                  setUser(null);
                }}
              >Log Out</button>
            </div>
          )}
        </div>) : 
        <div className="nav-auth-links">
          <Link to="/login" className="login-link">{LINK_TEXT.find(item => item.path === '/login')?.text}</Link>
        </div>
        }
      </div>
    </nav>
  );
};

export default Navbar;