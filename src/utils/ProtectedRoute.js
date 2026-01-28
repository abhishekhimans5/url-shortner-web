import { Navigate } from 'react-router-dom';
import { useContext } from 'react';
import LoginContextProvider from './LoginContextProvider';

const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem('token');
  const {isLoggedIn} = useContext(LoginContextProvider);

  if (!isLoggedIn || !token) {
    return <Navigate to="/login" replace />;
  }

  return children;
};
export default ProtectedRoute;