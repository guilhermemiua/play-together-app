import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import DropDownPicker from 'react-native-dropdown-picker';
import { COLORS, METRICS } from '../../constants';
import { getCities } from '../../services/city';

function SelectCity({ onChange, stateId, value }) {
  const { t } = useTranslation();

  const [open, setOpen] = useState(false);
  const [cities, setCities] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchAndSetCities = async ({ name }) => {
    setLoading(true);

    const { data } = await getCities({ stateId, name });

    setCities(
      data.map((city) => ({
        label: city.name,
        value: city.id,
      }))
    );

    setLoading(false);
  };

  useEffect(() => {
    if (stateId) {
      fetchAndSetCities({});
    }
  }, [stateId]);

  return (
    <DropDownPicker
      open={open}
      value={value}
      items={cities}
      setOpen={setOpen}
      setValue={onChange}
      disableLocalSearch
      placeholder=""
      searchPlaceholder={t('selectCity.placeholder')}
      loading={loading}
      onChangeValue={(selectedValue) => {
        onChange(selectedValue);
      }}
      onChangeSearchText={(text) => {
        fetchAndSetCities({ name: text });
      }}
      searchable
      setItems={setCities}
      style={{
        borderColor: COLORS.borderColor,
        borderRadius: METRICS.borderRadius,
        height: 40,
      }}
      searchTextInputStyle={{
        borderColor: COLORS.borderColor,
        borderRadius: METRICS.borderRadius,
        height: 40,
      }}
      dropDownContainerStyle={{
        borderColor: COLORS.black,
        borderRadius: METRICS.borderRadius,
      }}
      searchContainerStyle={{
        borderBottomColor: COLORS.black,
      }}
      textStyle={{
        color: COLORS.black,
        fontFamily: METRICS.fontFamilyRegular,
      }}
    />
  );
}

export default SelectCity;
