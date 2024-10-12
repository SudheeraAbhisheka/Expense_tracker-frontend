import React, { createContext, useState } from 'react';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [token, setToken] = useState(() => localStorage.getItem('token'));

    const handleLogin = (newToken) => {
        setToken(newToken);
        localStorage.setItem('token', newToken);
    };

    const handleLogout = () => {
        setToken(null);
        localStorage.removeItem('token');
        alert('You have successfully logged out!');
    };

    return (
        <AuthContext.Provider value={{ token, handleLogin, handleLogout }}>
            {children}
        </AuthContext.Provider>
    );
};
