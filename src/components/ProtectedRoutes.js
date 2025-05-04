import React from 'react';
import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectUser } from '../store/auth-slice/index';

const ProtectedRoutes = ({ children, allowedRoles }) => {
  const user = useSelector(selectUser);

  if (!user) {
    // Redirect to login if not authenticated
    return <Navigate to="/login" replace />;
  }

  if (!allowedRoles.includes(user.role)) {
    // Redirect to "Not Authorized" page if role doesn't match
    return <Navigate to="/not-authorized" replace />;
  }

  return children; // Render the protected component
};

export default ProtectedRoutes;
