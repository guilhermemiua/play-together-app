import * as yup from 'yup';

import i18next from 'i18next';

const schema = yup.object().shape({
  ratings: yup.array().of(
    yup.object().shape({
      rating: yup
        .number()
        .required(i18next.t('reviewPlayers.error.ratingRequired')),
    })
  ),
});

export default schema;
