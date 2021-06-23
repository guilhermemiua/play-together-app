// import React, { useState } from 'react';
// import { TouchableOpacity } from 'react-native-gesture-handler';

// import { StyleSheet } from 'react-native';
// import { Icon } from 'react-native-elements';
// import i18next from '../../internationalization';
// import { COLORS, LANGUAGES_ARRAY, METRICS, normalize } from '../../constants';
// import Text from '../Text';
// import { formatTimeToLocale } from '../../helpers';
// import Modal from '../Modal';
// import Input from '../Input';

// export default function SelectCity({ value, onChange }) {
//   const [show, setShow] = useState(false);

//   const onSelectCity = (city) => {
//     onChange(city);

//     // setShow(false);
//     setShow(false);
//   };

//   const showCityModal = () => {
//     setShow(true);
//   };

//   return (
//     <>
//       <TouchableOpacity onPress={showCityModal} style={styles.button}>
//         {/* <Icon name="clock" type="feather" color={COLORS.black} size={20} /> */}
//         <Text style={styles.buttonText}>
//           {value ? formatTimeToLocale(value) : ''}
//         </Text>
//       </TouchableOpacity>

//       {show && (
//         <Modal title="Select city" isOpen={show}>
//           <Input />
//           {LANGUAGES_ARRAY.map((language) => (
//             <TouchableOpacity
//               style={styles.languageItem}
//               key={language.value}
//               onPress={() => onSelectCity(language.value)}
//             >
//               <Text>{language.name}</Text>
//               {i18next.language === language.value && (
//                 <Icon
//                   name="check"
//                   type="feather"
//                   color={COLORS.primary}
//                   size={25}
//                 />
//               )}
//             </TouchableOpacity>
//           ))}
//         </Modal>
//       )}
//     </>
//   );
// }

// const styles = StyleSheet.create({
//   button: {
//     height: 40,
//     backgroundColor: COLORS.white,
//     paddingLeft: normalize(10),
//     flexDirection: 'row',
//     alignItems: 'center',
//     justifyContent: 'flex-start',
//     borderWidth: 1,
//     borderRadius: METRICS.borderRadius,
//     borderColor: COLORS.borderColor,
//   },
//   buttonText: {
//     fontFamily: METRICS.fontFamilyRegular,
//     fontSize: METRICS.inputFontSize,
//     // marginLeft: normalize(5),
//   },
//   languageItem: {
//     paddingVertical: METRICS.padding,
//     flexDirection: 'row',
//     alignItems: 'center',
//     justifyContent: 'space-between',
//   },
// });

import React, { useEffect, useState } from 'react';
import DropDownPicker from 'react-native-dropdown-picker';
import { COLORS, METRICS } from '../../constants';
import { getCities } from '../../services/city';

function SelectCity({ onChange, stateId, value }) {
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
      searchPlaceholder="Search city.."
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
