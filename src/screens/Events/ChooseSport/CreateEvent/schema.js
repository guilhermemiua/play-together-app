import * as yup from 'yup';
import isAfter from 'date-fns/isAfter';
import isSameDay from 'date-fns/isSameDay';

const schema = (t) =>
  yup.object().shape({
    state_id: yup
      .string()
      .required(t('createEvent.error.stateRequired'))
      .nullable(),
    city_id: yup.string().required(t('createEvent.error.cityRequired')),
    local: yup.string().required(t('createEvent.error.localRequired')),
    date: yup.date().required(t('createEvent.error.dateRequired')).nullable(),
    start_time: yup
      .date()
      .required(t('createEvent.error.startTimeRequired'))
      .nullable()
      .test(
        'is-greater',
        t('createEvent.error.startTimeGreaterThanCurrentTime'),
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
      .required(t('createEvent.error.endTimeRequired'))
      .nullable(),
    players_quantity: yup
      .string()
      .required(t('createEvent.error.playersQuantityRequired'))
      .min(2, t('createEvent.error.playersQuantityMin')),
  });

export default schema;
