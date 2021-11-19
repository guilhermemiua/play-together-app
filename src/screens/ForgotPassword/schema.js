import * as yup from 'yup';

const schema = (t) =>
  yup.object().shape({
    email: yup
      .string()
      .required(t('forgotPassword.error.emailRequired'))
      .email(t('forgotPassword.error.emailType')),
  });

export default schema;
