import * as yup from 'yup';

const schema = (t) =>
  yup.object().shape({
    token: yup.string().required(t('forgotPasswordToken.error.tokenRequired')),
  });

export default schema;
