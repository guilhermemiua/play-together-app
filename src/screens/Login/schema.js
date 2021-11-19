import * as yup from 'yup';

const schema = (t) =>
  yup.object().shape({
    email: yup
      .string()
      .required(t('login.error.emailRequired'))
      .email(t('login.error.emailType')),
    password: yup.string().required(t('login.error.passwordRequired')),
  });

export default schema;
