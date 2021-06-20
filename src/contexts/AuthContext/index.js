import React, { useContext, useEffect, useState } from 'react';
import {
  removeUserFromAsyncStorage,
  setUserToAsyncStorage,
  getUserFromAsyncStorage,
  setTokenToAsyncStorage,
  removeTokenFromAsyncStorage,
} from '../../helpers';
import { login } from '../../services';

export const AuthContext = React.createContext({});

const AuthProvider = ({ children }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loggedUser, setLoggedUser] = useState();

  const authenticate = async (email, password) => {
    try {
      const { data } = await login(email, password);

      setTokenToAsyncStorage(data.token);
      setUserToAsyncStorage(data.user);
      setLoggedUser(data.user);
      setIsAuthenticated(true);
    } catch (error) {
      console.log(error);
    }
  };

  const logout = () => {
    setIsAuthenticated(false);
    setLoggedUser(undefined);
    removeUserFromAsyncStorage();
    removeTokenFromAsyncStorage();
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
        setLoggedUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
