import React from 'react';
import { useAuth } from '@hooks/useAuth';
import { Navigate, useLocation } from 'react-router-dom';

export const ProtectedRoute = (props) => {
  const { children } = props;
  const { token } = useAuth();
  const location = useLocation();

  if (!token) {
    return <Navigate to="/login" replace state={{ from: location }} />;
  }

  return children;
};
