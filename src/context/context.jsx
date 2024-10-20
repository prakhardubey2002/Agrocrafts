import React, { createContext, useState, useEffect } from 'react';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem('token'));
  const [usertype, setUsertype] = useState(localStorage.getItem('usertype'));
  const [name, setname] = useState(localStorage.getItem('name'));


  useEffect(() => {
    if (token) {
      localStorage.setItem('token', token);
    } else {
      localStorage.removeItem('token');
    }
  }, [token]);
  useEffect(() => {
    if (token) {
      localStorage.setItem('name', name);
    } else {
      localStorage.removeItem('name');
    }
  }, [name]);
  useEffect(() => {
    if (usertype) {
      localStorage.setItem('usertype', name);
    } else {
      localStorage.removeItem('usertype');
    }
  }, [usertype]);
  

  const logout = () => {
    setToken(null);
    setUsertype(null);
    
  };

  return (
    <AuthContext.Provider value={{ token, setToken, logout, usertype, setUsertype,name, setname, }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;