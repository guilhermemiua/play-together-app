import React, { useEffect, useState } from 'react';
import { useAuth } from '../../hooks';

export const FilterEventContext = React.createContext({});

const FilterEventProvider = ({ children }) => {
  const { loggedUser } = useAuth();

  const [stateId, setStateId] = useState(null);
  const [cityId, setCityId] = useState(null);
  const [city, setCity] = useState(null);

  useEffect(() => {
    if (loggedUser) {
      setStateId(loggedUser?.state_id);
      setCityId(loggedUser?.city_id);
      setCity(loggedUser?.city?.name);
    }
  }, [loggedUser]);

  return (
    <FilterEventContext.Provider
      value={{
        setCity,
        city,
        setCityId,
        setStateId,
        cityId,
        stateId,
      }}
    >
      {children}
    </FilterEventContext.Provider>
  );
};

export default FilterEventProvider;
