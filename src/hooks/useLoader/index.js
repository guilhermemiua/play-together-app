import { useContext } from 'react';
import { LoaderContext } from '../../contexts/LoaderContext';

export const useLoader = () => {
  const context = useContext(LoaderContext);

  return context;
};
