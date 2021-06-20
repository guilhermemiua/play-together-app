import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Platform } from 'react-native';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useTranslation } from 'react-i18next';
import { Avatar, normalize } from 'react-native-elements';
import * as ImagePicker from 'expo-image-picker';
import Input from '../../../components/Input';
import Button from '../../../components/Button';
import { COLORS, METRICS } from '../../../constants';
import schema from './schema';
import InputContainer from '../../../components/InputContainer';
import Label from '../../../components/Label';
import ErrorMessage from '../../../components/ErrorMessage';
import Select from '../../../components/Select';
import { useAuth } from '../../../hooks';
import DefaultProfileImage from '../../../assets/images/DefaultProfile.png';
import { updateProfile } from '../../../services';
import { getImage, notify, setUserToAsyncStorage } from '../../../helpers';

export default function EditProfile({ navigation }) {
  const { t } = useTranslation();
  const { loggedUser, setLoggedUser } = useAuth();
  const [image, setImage] = useState(null);

  const {
    handleSubmit,
    control,
    formState: { errors },
    setValue,
  } = useForm({
    defaultValues: {
      first_name: '',
      last_name: '',
      age: '',
      gender: '',
      state: '',
      city: '',
    },
    resolver: yupResolver(schema),
  });

  const submit = async (values) => {
    try {
      const { first_name, last_name, age, gender, state, city } = values;

      const { data } = await updateProfile({
        first_name,
        last_name,
        age,
        gender,
        state,
        city,
        profile_image: image,
      });

      notify({ message: t('editProfile.successMessage'), type: 'success' });

      setLoggedUser(data);
      await setUserToAsyncStorage(data);

      await navigation.navigate('Profile');
    } catch (error) {
      notify({ message: t('editProfile.errorMessage'), type: 'danger' });
    }
  };

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.cancelled) {
      setImage(result.uri);
    }
  };

  useEffect(() => {
    (async () => {
      if (Platform.OS !== 'web') {
        const { status } =
          await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== 'granted') {
          // alert('Sorry, we need camera roll permissions to make this work!');
        }
      }
    })();
  }, []);

  useEffect(() => {
    if (loggedUser) {
      setValue('first_name', loggedUser?.first_name);
      setValue('last_name', loggedUser?.last_name);
      setValue('age', loggedUser?.age?.toString());
      setValue('gender', loggedUser?.gender);
      setValue('state', loggedUser?.state);
      setValue('city', loggedUser?.city);

      if (loggedUser.profile_image) {
        setImage(getImage(loggedUser.profile_image));
      }
    }
  }, [loggedUser]);

  return (
    <View style={styles.editProfile}>
      <View style={styles.editProfileContainer}>
        <Avatar
          source={
            image
              ? {
                  uri: image,
                }
              : DefaultProfileImage
          }
          rounded
          size={150}
          containerStyle={styles.profileImage}
          onPress={pickImage}
        >
          <Avatar.Accessory
            size={40}
            color={COLORS.white}
            style={{ backgroundColor: COLORS.primary }}
          />
        </Avatar>

        <InputContainer>
          <Label>{t('editProfile.firstNameLabel')}</Label>
          <Controller
            name="first_name"
            control={control}
            render={({ field: { onChange, value, ref } }) => (
              <Input
                onChangeText={(text) => {
                  onChange(text);
                }}
                value={value}
                inputRef={ref}
              />
            )}
          />
          <ErrorMessage>{errors?.first_name?.message}</ErrorMessage>
        </InputContainer>

        <InputContainer>
          <Label>{t('editProfile.lastNameLabel')}</Label>
          <Controller
            name="last_name"
            control={control}
            render={({ field: { onChange, value, ref } }) => (
              <Input
                onChangeText={(text) => onChange(text)}
                value={value}
                inputRef={ref}
              />
            )}
          />
          <ErrorMessage>{errors?.last_name?.message}</ErrorMessage>
        </InputContainer>

        <View style={{ flexDirection: 'row' }}>
          <InputContainer style={{ flex: 1, marginRight: METRICS.margin }}>
            <Label>{t('editProfile.ageLabel')}</Label>
            <Controller
              name="age"
              control={control}
              render={({ field: { onChange, value, ref } }) => (
                <Input
                  onChangeText={(text) => onChange(text)}
                  value={value}
                  inputRef={ref}
                  keyboardType="numeric"
                />
              )}
            />
            <ErrorMessage>{errors?.age?.message}</ErrorMessage>
          </InputContainer>
          <InputContainer style={{ flex: 1 }}>
            <Label>{t('editProfile.genderLabel')}</Label>
            <Controller
              name="gender"
              control={control}
              render={({ field: { onChange, value, ref } }) => (
                <Select
                  items={[
                    { label: t('gender.male'), value: 'male' },
                    { label: t('gender.female'), value: 'female' },
                  ]}
                  value={value}
                  onValueChange={(selectedValue) => {
                    onChange(selectedValue);
                  }}
                  selectRef={ref}
                />
              )}
            />
            <ErrorMessage>{errors?.gender?.message}</ErrorMessage>
          </InputContainer>
        </View>

        <InputContainer>
          <Label>{t('editProfile.stateLabel')}</Label>
          <Controller
            name="state"
            control={control}
            render={({ field: { onChange, value } }) => (
              <Select
                items={[{ label: 'SP', value: 'SP' }]}
                value={value}
                onValueChange={(values) => onChange(values)}
              />
            )}
          />
          <ErrorMessage>{errors?.state?.message}</ErrorMessage>
        </InputContainer>

        <InputContainer>
          <Label>{t('editProfile.cityLabel')}</Label>
          <Controller
            name="city"
            control={control}
            render={({ field: { onChange, value } }) => (
              <Select
                items={[{ label: 'Mogi das Cruzes', value: 'Mogi das Cruzes' }]}
                value={value}
                onValueChange={(values) => onChange(values)}
              />
            )}
          />
          <ErrorMessage>{errors?.city?.message}</ErrorMessage>
        </InputContainer>

        <Button
          title={t('editProfile.submitButton')}
          onPress={handleSubmit(submit)}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  editProfile: {
    flex: 1,
    backgroundColor: COLORS.screenBackgroundColor,
  },
  editProfileContainer: {
    marginVertical: METRICS.containerMarginVertical,
    marginHorizontal: METRICS.containerMarginHorizontal,
    flex: 1,
    justifyContent: 'center',
  },
  profileImage: {
    alignSelf: 'center',
    marginBottom: normalize(METRICS.margin / 2),
    backgroundColor: COLORS.white,
  },
});
