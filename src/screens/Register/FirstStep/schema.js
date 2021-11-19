import * as yup from 'yup';

const schema = (t) =>
  yup.object().shape({
    first_name: yup
      .string()
      .required(t('register.firstStep.error.firstNameRequired')),
    last_name: yup
      .string()
      .required(t('register.firstStep.error.lastNameRequired')),
    age: yup.string().required(t('register.firstStep.error.ageRequired')),
    gender: yup.string().required(t('register.firstStep.error.genderRequired')),
    state_id: yup
      .string()
      .required(t('register.firstStep.error.stateRequired'))
      .nullable(),
    city_id: yup
      .string()
      .required(t('register.firstStep.error.cityRequired'))
      .nullable(),
  });

export default schema;
