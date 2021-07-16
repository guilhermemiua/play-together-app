import { useContext } from 'react';
import { FilterEventContext } from '../../contexts/FilterEventContext';

export const useEventFilter = () => {
  const context = useContext(FilterEventContext);

  return context;
};
