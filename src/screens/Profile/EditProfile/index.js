import React, { useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useTranslation } from 'react-i18next';
import Input from '../../../components/Input';
import Button from '../../../components/Button';
import { COLORS, METRICS } from '../../../constants';
import schema from './schema';
import InputContainer from '../../../components/InputContainer';
import Label from '../../../components/Label';
import ErrorMessage from '../../../components/ErrorMessage';
import Select from '../../../components/Select';
import { useAuth } from '../../../contexts/AuthContext';

export default function EditProfile({ navigation }) {
  const { t } = useTranslation();
  const { loggedUser } = useAuth();

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
      phone: '',
      state: '',
      city: '',
    },
    resolver: yupResolver(schema),
  });

  const submit = async (values) => {
    console.log(values);
  };

  useEffect(() => {
    if (loggedUser) {
      // console.log(loggedUser);
      setValue('first_name', loggedUser?.first_name);
      setValue('last_name', loggedUser?.last_name);
      setValue('age', loggedUser?.age?.toString());
      setValue('gender', loggedUser?.gender);
      setValue('phone', loggedUser?.phone);
      setValue('state', loggedUser?.state);
      setValue('city', loggedUser?.city);
    }
  }, [loggedUser]);

  return (
    <View style={styles.editProfile}>
      <View style={styles.editProfileContainer}>
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
          <Label>{t('editProfile.phoneLabel')}</Label>
          <Controller
            name="phone"
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
          <ErrorMessage>{errors?.phone?.message}</ErrorMessage>
        </InputContainer>

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
});
