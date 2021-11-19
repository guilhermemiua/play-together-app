import * as yup from 'yup';

const schema = (t) =>
  yup.object().shape({
    email: yup
      .string()
      .email(t('changeEmail.error.emailInvalid'))
      .required(t('changeEmail.error.emailRequired')),
  });

export default schema;
