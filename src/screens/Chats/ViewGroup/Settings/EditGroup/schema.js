import * as yup from 'yup';

import i18next from 'i18next';

const schema = yup.object().shape({
  name: yup.string().required(i18next.t('editGroupChat.error.nameRequired')),
});

export default schema;
