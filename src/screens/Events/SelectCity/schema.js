import * as yup from 'yup';
import isAfter from 'date-fns/isAfter';
import isSameDay from 'date-fns/isSameDay';

import i18next from 'i18next';

const schema = yup.object().shape({
  state_id: yup
    .string()
    .required(i18next.t('eventSelectCity.error.stateRequired'))
    .nullable(),
  city_id: yup
    .string()
    .required(i18next.t('eventSelectCity.error.cityRequired')),
});

export default schema;
