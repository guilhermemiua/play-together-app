import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import {
  removeUserFromAsyncStorage,
  setUserToAsyncStorage,
  getUserFromAsyncStorage,
  setTokenToAsyncStorage,
  removeTokenFromAsyncStorage,
  notify,
} from '../../helpers';
import { useLoader } from '../../hooks';
import { login, getLoggedUser } from '../../services';

export const AuthContext = React.createContext({});

const AuthProvider = ({ children }) => {
  const { t } = useTranslation();

  const { setLoading } = useLoader();

  const [isLoading, setIsLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loggedUser, setLoggedUser] = useState();

  const authenticate = async (email, password) => {
    try {
      setLoading(true);

      const { data } = await login(email, password);

      await setTokenToAsyncStorage(data.token);

      await getAndSetLoggedUser();

      setIsAuthenticated(true);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      notify({ message: t('login.errorMessage'), type: 'danger' });
    }
  };

  const logout = () => {
    setIsAuthenticated(false);
    setLoggedUser(undefined);
    removeUserFromAsyncStorage();
    removeTokenFromAsyncStorage();
  };

  const getAndSetLoggedUser = async () => {
    const { data } = await getLoggedUser();

    setUserToAsyncStorage(data);
    setLoggedUser(data);
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
        getAndSetLoggedUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
