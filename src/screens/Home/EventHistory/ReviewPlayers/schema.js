import * as yup from 'yup';

const schema = (t) =>
  yup.object().shape({
    review_users: yup.array().of(
      yup.object().shape({
        rating: yup.number().required(t('reviewPlayers.error.ratingRequired')),
      })
    ),
  });

export default schema;
