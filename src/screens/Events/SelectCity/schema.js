import * as yup from 'yup';

const schema = (t) =>
  yup.object().shape({
    state_id: yup
      .string()
      .required(t('eventSelectCity.error.stateRequired'))
      .nullable(),
    city_id: yup.string().required(t('eventSelectCity.error.cityRequired')),
  });

export default schema;
