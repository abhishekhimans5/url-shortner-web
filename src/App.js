
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import Analytics from './components/Analytics/Analytics';
import CreateUrl from './components/CreateUrl/CreateUrl';
import Dashboard from './components/Dashboard/Dashboard';
import Login from './components/Login/Login';
import Navbar from './components/Navbar/Navbar';
import Profile from './components/Profile/Profile';
import Signup from './components/Signup/Signup';
import ProtectedRoute from './utils/ProtectedRoute';
import LoginContextProvider from './utils/LoginContextProvider';
import { useEffect, useState } from 'react';
import { getUserDetails } from './api/getUserDetails';
import { userModel } from './models/user';



function App() {

  const [user, setUser] = useState(userModel);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  useEffect(() => {
    const token = localStorage.getItem('token');
    if(token) {
      const result = getUserDetails(token);
      result.then((result) => {
        const newData = {
          ...user,
          name: result.data.name,
          email: result.data.email,
          isVerified: result.data.isVerified
        };
        setUser(newData);
        setIsLoggedIn(true);
        }
        )
      .catch((err) => {
        setIsLoggedIn(false);
      });
    }

  }, []);

  return (
    <div className="App">
      <header className="App-header">

        <LoginContextProvider.Provider value={{ user, setUser, isLoggedIn, setIsLoggedIn }}>
          <BrowserRouter>
            <Navbar />
            <Routes>
                    <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
                    <Route path="/create-link" element={<ProtectedRoute><CreateUrl /></ProtectedRoute>} />
                    <Route path="/analytics/:id" element={<ProtectedRoute><Analytics /></ProtectedRoute>} />
                    <Route path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Signup />} />
            </Routes>
          </BrowserRouter>
        </LoginContextProvider.Provider>
    
      </header>
    </div>
  );
}

export default App;
