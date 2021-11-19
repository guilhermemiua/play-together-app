import * as yup from 'yup';
import isAfter from 'date-fns/isAfter';
import isSameDay from 'date-fns/isSameDay';

const schema = (t) =>
  yup.object().shape({
    state_id: yup
      .string()
      .required(t('editEvent.error.stateRequired'))
      .nullable(),
    city_id: yup.string().required(t('editEvent.error.cityRequired')),
    local: yup.string().required(t('editEvent.error.localRequired')),
    date: yup.date().required(t('editEvent.error.dateRequired')).nullable(),
    start_time: yup
      .date()
      .required(t('editEvent.error.startTimeRequired'))
      .nullable()
      .test(
        'is-greater',
        t('editEvent.error.startTimeGreaterThanCurrentTime'),
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
      .required(t('editEvent.error.endTimeRequired'))
      .nullable(),
    players_quantity: yup
      .string()
      .required(t('editEvent.error.playersQuantityRequired')),
  });

export default schema;
