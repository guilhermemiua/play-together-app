import * as yup from 'yup';

const schema = (t) =>
  yup.object().shape({
    name: yup.string().required(t('editGroupChat.error.nameRequired')),
  });

export default schema;
