import * as yup from 'yup';

const schema = (t) =>
  yup.object().shape({
    first_name: yup.string().required(t('editProfile.error.firstNameRequired')),
    last_name: yup.string().required(t('editProfile.error.lastNameRequired')),
    age: yup.string().required(t('editProfile.error.ageRequired')),
    gender: yup.string().required(t('editProfile.error.genderRequired')),
    state_id: yup.string().required(t('editProfile.error.stateRequired')),
    city_id: yup.string().required(t('editProfile.error.cityRequired')),
  });

export default schema;
