import { useAuth } from '@hooks/useAuth';
import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

function ReceiveToken() {
  const location = useLocation();
  const { onLogin } = useAuth();

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const token = params.get('data');
    // Call API get access token.
    if (token) {
      onLogin(token);
    }
  }, [useLocation]);

  return <div>Loading ...</div>;
}

export default ReceiveToken;
