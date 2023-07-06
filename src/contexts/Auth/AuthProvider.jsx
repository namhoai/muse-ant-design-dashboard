import { loadFromLocalStorage, saveToLocalStorage } from '@databases/localStorage';
import * as React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { contantAuthentication } from '@constants/index';

// Context.
import { AuthContext } from './Authcontext';

// Service.
import { signOut } from '@modules/authentication/services/authenticationService';

const AuthProvider = (props) => {
  const { children } = props;
  const navigate = useNavigate();
  const location = useLocation();
  const [isLogin, setIsLogin] = React.useState(false);

  const [token, setToken] = React.useState(loadFromLocalStorage(contantAuthentication.DATA_AUTH));

  React.useEffect(() => {
    if (isLogin) {
      const origin = location.state?.from?.pathname || '/admin/trang-chu';
      navigate(origin);
    }
  }, [isLogin]);

  const handleLogin = async (token) => {
    // Call after Login Success.
    setToken(token);
    saveToLocalStorage(contantAuthentication.DATA_AUTH, token);
    setIsLogin(true);
  };

  const handleLogout = async () => {
    // Call after Logout Success.
    const response = await signOut();
    if (response.status === 200) {
      setToken('');
      saveToLocalStorage(contantAuthentication.DATA_AUTH, '');
      setIsLogin(false);
      navigate('/login');
    }
  };

  const value = {
    token,
    onLogin: handleLogin,
    onLogout: handleLogout
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default AuthProvider;
