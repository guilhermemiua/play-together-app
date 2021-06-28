import * as yup from 'yup';
import isAfter from 'date-fns/isAfter';
import isSameDay from 'date-fns/isSameDay';

import i18next from 'i18next';

const schema = yup.object().shape({
  state_id: yup
    .string()
    .required(i18next.t('editEvent.error.stateRequired'))
    .nullable(),
  city_id: yup.string().required(i18next.t('editEvent.error.cityRequired')),
  local: yup.string().required(i18next.t('editEvent.error.localRequired')),
  date: yup
    .date()
    .required(i18next.t('editEvent.error.dateRequired'))
    .nullable(),
  start_time: yup
    .date()
    .required(i18next.t('editEvent.error.startTimeRequired'))
    .nullable()
    .test(
      'is-greater',
      i18next.t('editEvent.error.startTimeGreaterThanCurrentTime'),
      (startTime, context) => {
        const { date } = context.parent;

        if (isSameDay(startTime, date)) {
          return isAfter(startTime, new Date());
        }

        return true;
      }
    ),
  end_time: yup
    .date()
    .required(i18next.t('editEvent.error.endTimeRequired'))
    .nullable(),
  // .when(
  //   'start_time',
  //   (startTime, schema) =>
  //     startTime &&
  //     schema.min(
  //       startTime,
  //       i18next.t('editEvent.error.endTimeGreaterThanStartTime')
  //     )
  // ),
  // TODO: MIN 2 PLAYERS
  players_quantity: yup
    .string()
    .required(i18next.t('editEvent.error.playersQuantityRequired')),
});

export default schema;
