import React from 'react';
import { Navigate } from 'react-router-dom';

const RoleProtectedRoute = ({ user, userRole, allowedRole, children }) => {
  if (!user) {
    // If user is not logged in, redirect to the landing page
    return <Navigate to="/" replace />;
  }

  if (userRole && userRole !== allowedRole) {
    // If user's role does not match, redirect to their dashboard
    return <Navigate to="/dashboard" replace />;
  }
  
  // If user role matches, show the page content
  return children;
};

export default RoleProtectedRoute;