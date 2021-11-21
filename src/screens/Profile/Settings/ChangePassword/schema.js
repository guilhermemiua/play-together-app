import * as yup from 'yup';

const schema = (t) =>
  yup.object().shape({
    password: yup
      .string()
      .required(t('changePassword.error.passwordRequired'))
      .min(8, t('changePassword.error.passwordMin')),
    confirm_password: yup
      .string()
      .required(t('changePassword.error.confirmPasswordRequired'))
      .oneOf(
        [yup.ref('password'), null],
        t('changePassword.error.equalPassword')
      ),
  });

export default schema;
