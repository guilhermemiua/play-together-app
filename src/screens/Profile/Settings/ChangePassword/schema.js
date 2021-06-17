import * as yup from 'yup';

import i18next from '../../../../internationalization';

const schema = yup.object().shape({
  password: yup
    .string()
    .required(i18next.t('changePassword.error.passwordRequired')),
  confirm_password: yup
    .string()
    .required(i18next.t('changePassword.error.confirmPasswordRequired'))
    .oneOf(
      [yup.ref('password'), null],
      i18next.t('changePassword.error.equalPassword')
    ),
});

export default schema;
