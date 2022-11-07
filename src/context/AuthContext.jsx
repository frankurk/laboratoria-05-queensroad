import React, { createContext, useState } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
 
  const [isLoggedin, setIsLoggedin] = useState(false);

  let headers = {
    Authorization: `Bearer ${localStorage.getItem("token")}`,
  };

  return (
    <AuthContext.Provider value={{ headers, setIsLoggedin}}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
