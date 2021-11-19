import * as yup from 'yup';

const schema = (t) =>
  yup.object().shape({
    email: yup
      .string()
      .required(t('register.secondStep.error.emailRequired'))
      .email(t('register.secondStep.error.emailType')),
    password: yup
      .string()
      .required(t('register.secondStep.error.passwordRequired')),
  });

export default schema;
