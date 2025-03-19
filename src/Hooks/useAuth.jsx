import React, { useContext } from 'react';
import { AuthContext } from '../Provider/AuthProvider';

const useAuth = () => {
    const authContext=useContext(AuthContext)
    return authContext;
};

export default useAuth;