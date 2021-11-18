import * as yup from 'yup';

import i18next from 'i18next';

const schema = yup.object().shape({
  email: yup
    .string()
    .email(i18next.t('changeEmail.error.emailType'))
    .required(i18next.t('changeEmail.error.emailInvalid')),
});

export default schema;
