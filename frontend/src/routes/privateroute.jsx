import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../auth/authprovider';

const PrivateRoute = ({ children, allowedRole }) => {
  const { user, userRole } = useAuth();

  if (!user) {
    return <Navigate to="/login" />;
  }

  // If allowedRole is specified, check if user has the required role
  if (allowedRole && userRole !== allowedRole) {
    return <Navigate to="/home" />;  // Redirect to home if wrong role
  }

  return children;
};

export default PrivateRoute;
