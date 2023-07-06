import React from 'react';
import { AuthContext } from '@contexts/Auth/Authcontext';

export const useAuth = () => React.useContext(AuthContext);
