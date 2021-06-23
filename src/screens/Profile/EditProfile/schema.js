import * as yup from 'yup';

import i18next from 'i18next';

const schema = yup.object().shape({
  first_name: yup
    .string()
    .required(i18next.t('editProfile.error.firstNameRequired')),
  last_name: yup
    .string()
    .required(i18next.t('editProfile.error.lastNameRequired')),
  age: yup.string().required(i18next.t('editProfile.error.ageRequired')),
  gender: yup.string().required(i18next.t('editProfile.error.genderRequired')),
  state_id: yup.string().required(i18next.t('editProfile.error.stateRequired')),
  city_id: yup.string().required(i18next.t('editProfile.error.cityRequired')),
});

export default schema;
