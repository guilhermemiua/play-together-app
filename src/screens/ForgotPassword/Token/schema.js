import * as yup from 'yup';

import i18next from 'i18next';

const schema = yup.object().shape({
  token: yup
    .string()
    .required(i18next.t('forgotPasswordToken.error.tokenRequired')),
});

export default schema;
