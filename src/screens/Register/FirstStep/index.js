import React from 'react';
import { View, StyleSheet } from 'react-native';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useTranslation } from 'react-i18next';

import Container from '../../../components/Container';
import Input from '../../../components/Input';
import Select from '../../../components/Select';
import Button from '../../../components/Button';
import { COLORS, METRICS } from '../../../constants';
import schema from './schema';
import RegisterSteps from '../../../components/RegisterSteps';
import Label from '../../../components/Label';
import ErrorMessage from '../../../components/ErrorMessage';
import InputContainer from '../../../components/InputContainer';
import SelectCity from '../../../components/SelectCity';
import SelectStates from '../../../components/SelectStates';

export default function RegisterFirstStep({ navigation: { navigate } }) {
  const { t } = useTranslation();

  const {
    handleSubmit,
    control,
    formState: { errors },
    watch,
  } = useForm({
    defaultValues: {
      first_name: '',
      last_name: '',
      age: '',
      gender: '',
      state_id: '',
      city_id: '',
    },
    resolver: yupResolver(schema),
  });

  const watchStateId = watch('state_id');

  const navigateToSecondStep = ({
    first_name,
    last_name,
    age,
    gender,
    state_id,
    city_id,
  }) =>
    navigate('RegisterSecondStep', {
      first_name,
      last_name,
      age,
      gender,
      state_id,
      city_id,
    });

  const submit = async (values) => {
    const { first_name, last_name, age, gender, state_id, city_id } = values;

    navigateToSecondStep({
      first_name,
      last_name,
      age,
      gender,
      state_id,
      city_id,
    });
  };

  return (
    <View style={styles.register}>
      <Container justifyContent="center">
        <RegisterSteps currentStep={0} />

        <InputContainer>
          <Label>{t('register.firstStep.firstNameLabel')}</Label>
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
          <Label>{t('register.firstStep.lastNameLabel')}</Label>
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
            <Label>{t('register.firstStep.ageLabel')}</Label>
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
            <Label>{t('register.firstStep.genderLabel')}</Label>
            <Controller
              name="gender"
              control={control}
              render={({ field: { onChange, value } }) => (
                <Select
                  items={[
                    { label: t('gender.male'), value: 'male' },
                    { label: t('gender.female'), value: 'female' },
                  ]}
                  value={value}
                  onValueChange={(values) => onChange(values)}
                />
              )}
            />
            <ErrorMessage>{errors?.gender?.message}</ErrorMessage>
          </InputContainer>
        </View>

        <InputContainer>
          <Label>{t('editProfile.stateLabel')}</Label>
          <Controller
            name="state_id"
            control={control}
            render={({ field: { onChange, value } }) => (
              <SelectStates onChange={onChange} value={value} />
            )}
          />
          <ErrorMessage>{errors?.state_id?.message}</ErrorMessage>
        </InputContainer>

        <InputContainer>
          <Label>{t('editProfile.cityLabel')}</Label>
          <Controller
            name="city_id"
            control={control}
            render={({ field: { onChange, value } }) => (
              <SelectCity
                onChange={onChange}
                stateId={watchStateId}
                value={value}
              />
            )}
          />
          <ErrorMessage>{errors?.city_id?.message}</ErrorMessage>
        </InputContainer>

        <Button
          title={t('register.firstStep.submitButton')}
          onPress={handleSubmit(submit)}
        />
      </Container>
    </View>
  );
}

const styles = StyleSheet.create({
  register: {
    flex: 1,
    backgroundColor: COLORS.screenBackgroundColor,
  },
});
