import * as yup from 'yup';

import i18next from 'i18next';

const schema = yup.object().shape({
  state: yup.string().required(i18next.t('login.error.emailRequired')),
  city: yup.string().required(i18next.t('login.error.emailRequired')),
  local: yup.string().required(i18next.t('login.error.emailRequired')),
  date: yup.date().required(i18next.t('login.error.emailRequired')),
  start_time: yup.date().required(i18next.t('login.error.emailRequired')),
  end_time: yup.date().required(i18next.t('login.error.emailRequired')),
  players_quantity: yup
    .string()
    .required(i18next.t('login.error.emailRequired')),
});

export default schema;
