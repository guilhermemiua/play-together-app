import * as yup from 'yup';

import i18next from 'i18next';

const schema = yup.object().shape({
  // email: yup
  //   .string()
  //   .required(i18next.t('login.error.emailRequired'))
  //   .email(i18next.t('login.error.emailType')),
  // password: yup.string().required(i18next.t('login.error.passwordRequired')),
});

export default schema;
