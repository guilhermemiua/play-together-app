import { showMessage } from 'react-native-flash-message';

const notify = ({ message, type }) => {
  if (type === 'danger') {
    return showMessage({
      message,
      icon: 'danger',
      type: 'danger',
      duration: 4000,
    });
  }

  return showMessage({
    message,
    icon: 'default',
    type: 'default',
    duration: 4000,
  });
};

export { notify };
