import React, { useContext, useState } from 'react';

export const RegisterContext = React.createContext({});

const RegisterProvider = ({ children }) => {
  const [values, setValues] = useState({});

  return (
    <RegisterContext.Provider
      value={{
        setValues,
        values,
      }}
    >
      {children}
    </RegisterContext.Provider>
  );
};

export const useRegister = () => useContext(RegisterContext);

export default RegisterProvider;
