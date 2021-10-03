import React, { useEffect, useState } from 'react';
import { useAuth, useLoader } from '../../hooks';
import { getEvents } from '../../services';

export const FilterEventContext = React.createContext({});

const FilterEventProvider = ({ children }) => {
  const { loggedUser } = useAuth();
  const { setLoading } = useLoader();

  const [stateId, setStateId] = useState(null);
  const [currentCityId, setCurrentCityId] = useState(null);
  const [cityId, setCityId] = useState(null);
  const [city, setCity] = useState(null);
  const [events, setEvents] = useState([]);
  const [offset, setOffset] = useState(0);
  const [limit, setLimit] = useState(10);
  const [total, setTotal] = useState(0);
  const [refetch, setRefetch] = useState(false);

  const handleGetEvents = async () => {
    try {
      setLoading(true);

      const { data } = await getEvents({
        offset: 0,
        limit: 10,
        type: 'upcoming',
        cityId,
      });

      setLoading(false);
      setTotal(data.total);
      setEvents(data.results);
    } catch (error) {
      setLoading(false);
    }
  };

  const handleGetMoreEvents = async () => {
    try {
      setLoading(true);

      const { data } = await getEvents({
        offset,
        limit,
        type: 'upcoming',
        cityId,
      });

      setLoading(false);
      setTotal(data.total);
      setEvents([...events, ...data.results]);
    } catch (error) {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (cityId && currentCityId) {
      if (cityId !== currentCityId) {
        setOffset(0);
        setCurrentCityId(cityId);
        handleGetEvents();
      }
    }
  }, [cityId, currentCityId]);

  useEffect(() => {
    if (offset && limit) {
      handleGetMoreEvents();
    }
  }, [offset, limit]);

  useEffect(() => {
    if (loggedUser) {
      handleGetEvents();
      setStateId(loggedUser?.state_id);
      setCityId(loggedUser?.city_id);
      setCurrentCityId(loggedUser?.city_id);
      setCity(loggedUser?.city?.name);
    }
  }, [loggedUser]);

  useEffect(() => {
    if (refetch) {
      setOffset(0);
      handleGetEvents();
      setRefetch(false);
    }
  }, [refetch]);

  return (
    <FilterEventContext.Provider
      value={{
        setCity,
        city,
        setCityId,
        setStateId,
        cityId,
        stateId,
        events,
        offset,
        setOffset,
        setEvents,
        limit,
        setLimit,
        total,
        setTotal,
        setRefetch,
        refetch,
      }}
    >
      {children}
    </FilterEventContext.Provider>
  );
};

export default FilterEventProvider;
