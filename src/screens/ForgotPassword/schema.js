import * as yup from 'yup';

import i18next from 'i18next';

const schema = yup.object().shape({
  email: yup
    .string()
    .required(i18next.t('forgotPassword.error.emailRequired'))
    .email(i18next.t('forgotPassword.error.emailType')),
});

export default schema;
