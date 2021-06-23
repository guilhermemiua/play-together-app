import React, { useEffect, useState } from 'react';
import { getStates } from '../../services';
import Select from '../Select';

const SelectStates = ({ onChange, value }) => {
  const [states, setStates] = useState([]);

  useEffect(() => {
    const fetchAndSetStates = async () => {
      const { data } = await getStates();

      setStates(
        data.map((item) => ({
          label: item.name,
          value: item.id,
        }))
      );
    };

    fetchAndSetStates();
  }, []);

  return (
    <Select
      items={states}
      value={value}
      onValueChange={(values) => onChange(values)}
    />
  );
};

export default SelectStates;
