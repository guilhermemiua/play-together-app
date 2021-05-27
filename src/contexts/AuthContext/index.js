import React, { useEffect, useState } from 'react';
import {
  removeUserFromAsyncStorage,
  setUserToAsyncStorage,
  getUserFromAsyncStorage,
} from '../../helpers';

export const AuthContext = React.createContext({});

const AuthProvider = ({ children }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loggedUser, setLoggedUser] = useState();

  const authenticate = (user) => {
    setUserToAsyncStorage(user);
    setLoggedUser(user);
    setIsAuthenticated(true);
  };

  const logout = () => {
    setIsAuthenticated(false);
    setLoggedUser(undefined);
    removeUserFromAsyncStorage();
  };

  useEffect(() => {
    const verifyAuthentication = async () => {
      const userStorage = await getUserFromAsyncStorage();

      if (userStorage) {
        setIsAuthenticated(true);
        setLoggedUser(userStorage);
      }

      setIsLoading(false);
    };

    verifyAuthentication();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        loggedUser,
        authenticate,
        logout,
        isAuthenticated,
        isLoading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
