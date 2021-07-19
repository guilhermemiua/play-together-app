import * as yup from 'yup';

import i18next from '../../../internationalization';

const schema = yup.object().shape({
  password: yup
    .string()
    .required(i18next.t('forgotPasswordNewPassword.error.passwordRequired')),
});

export default schema;
