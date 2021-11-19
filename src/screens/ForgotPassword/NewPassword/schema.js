import * as yup from 'yup';

const schema = (t) =>
  yup.object().shape({
    password: yup
      .string()
      .required(t('forgotPasswordNewPassword.error.passwordRequired')),
  });

export default schema;
