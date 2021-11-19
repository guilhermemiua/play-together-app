import * as yup from 'yup';

const schema = (t) =>
  yup.object().shape({
    name: yup.string().required(t('newGroupChat.error.nameRequired')),
  });

export default schema;
