import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';

import { useAuth } from '@hooks/useAuth';

// Constant
import { REDIRECT_URL, URL_AUTH_API } from '@configs/env';

function LoginSSOPage() {
  const { token } = useAuth();
  const location = useLocation();

  if (!token) {
    window.location = `${URL_AUTH_API}/login?redirect=${REDIRECT_URL}/rececive`;
  } else {
    return <Navigate to="/admin/home" replace state={{ from: location }} />;
  }

  return null;
}

export default LoginSSOPage;
