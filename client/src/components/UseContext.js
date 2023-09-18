import React, { createContext, useContext, useState } from 'react';

const AuthContext = createContext();

function UseContext({ children }) {
  const [user, setUser] = useState(null);

  const login = (userData) => {
    setUser(userData);
  };

  const logout = () => {
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

function useAuth() {
  return useContext(AuthContext);
}

export default UseContext; // Export the UseContext component as the default export
export { useAuth }; // Export the useAuth function as a named export
