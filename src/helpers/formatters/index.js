import dayjs from 'dayjs';
import localizedFormat from 'dayjs/plugin/localizedFormat';
import i18next from 'i18next';

import 'dayjs/locale/pt-br';
import 'dayjs/locale/en';

const initializeLocale = () => {
  dayjs.extend(localizedFormat);
  dayjs.locale(
    i18next.language === 'en-US' ? 'en' : i18next.language.toLowerCase()
  );
};

export const formatDateToLocale = (date) => {
  initializeLocale();

  return dayjs(date).format('L');
};

export const formatTimeToLocale = (date) => {
  initializeLocale();

  return dayjs(date).format('LT');
};

export const formatFullName = (user) =>
  `${user?.first_name} ${user?.last_name}`;
