import * as yup from 'yup';

import i18next from 'i18next';

const schema = yup.object().shape({
  password: yup
    .string()
    .required(i18next.t('forgotPasswordNewPassword.error.passwordRequired')),
});

export default schema;
