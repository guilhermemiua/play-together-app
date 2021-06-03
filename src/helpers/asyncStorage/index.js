import AsyncStorage from '@react-native-async-storage/async-storage';

const TOKEN_STORAGE_NAME = 'play_together@token';
const USER_STORAGE_NAME = 'play_together@user';
const LANGUAGE_STORAGE_NAME = 'play_together@language';

const getLanguage = async () => AsyncStorage.getItem(LANGUAGE_STORAGE_NAME);

const setLanguageToAsyncStorage = async (language) => {
  await AsyncStorage.setItem(LANGUAGE_STORAGE_NAME, language);
};

const removeLanguageFromAsyncStorage = async () => {
  await AsyncStorage.removeItem(LANGUAGE_STORAGE_NAME);
};

const getToken = async () => AsyncStorage.getItem(TOKEN_STORAGE_NAME);

const setTokenToAsyncStorage = async (token) => {
  await AsyncStorage.setItem(TOKEN_STORAGE_NAME, token);
};

const removeTokenFromAsyncStorage = async () => {
  await AsyncStorage.removeItem(TOKEN_STORAGE_NAME);
};

const setUserToAsyncStorage = async (user) => {
  await AsyncStorage.setItem(USER_STORAGE_NAME, JSON.stringify(user));
};

const removeUserFromAsyncStorage = async () => {
  await AsyncStorage.removeItem(USER_STORAGE_NAME);
};

const getUserFromAsyncStorage = async () => {
  const user = await AsyncStorage.getItem(USER_STORAGE_NAME);

  if (user) {
    return JSON.parse(user);
  }

  return null;
};

export {
  getLanguage,
  setLanguageToAsyncStorage,
  removeLanguageFromAsyncStorage,
  setTokenToAsyncStorage,
  removeTokenFromAsyncStorage,
  setUserToAsyncStorage,
  removeUserFromAsyncStorage,
  getToken,
  getUserFromAsyncStorage,
};
