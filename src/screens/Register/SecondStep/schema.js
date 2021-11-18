import * as yup from 'yup';

import i18next from 'i18next';

const schema = yup.object().shape({
  email: yup
    .string()
    .required(i18next.t('register.secondStep.error.emailRequired'))
    .email(i18next.t('register.secondStep.error.emailType')),
  password: yup
    .string()
    .required(i18next.t('register.secondStep.error.passwordRequired')),
});

export default schema;
