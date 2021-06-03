import * as yup from 'yup';

import i18next from 'i18next';

const schema = yup.object().shape({
  first_name: yup
    .string()
    .required(i18next.t('register.firstStep.error.firstNameRequired')),
  last_name: yup
    .string()
    .required(i18next.t('register.firstStep.error.lastNameRequired')),
  age: yup.string().required(i18next.t('register.firstStep.error.ageRequired')),
  gender: yup
    .string()
    .required(i18next.t('register.firstStep.error.genderRequired')),
  phone: yup
    .string()
    .required(i18next.t('register.firstStep.error.phoneRequired')),
});

export default schema;
