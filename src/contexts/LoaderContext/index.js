import React, { useState } from 'react';
import Loader from '../../components/Loader';

export const LoaderContext = React.createContext({});

const LoaderProvider = ({ children }) => {
  const [loading, setLoading] = useState(false);

  return (
    <LoaderContext.Provider
      value={{
        loading,
        setLoading,
      }}
    >
      {children}

      {loading && <Loader />}
    </LoaderContext.Provider>
  );
};

export default LoaderProvider;
