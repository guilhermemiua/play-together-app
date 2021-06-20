import React from 'react';
import { View, StyleSheet } from 'react-native';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useTranslation } from 'react-i18next';

import Container from '../../../components/Container';
import InputComponent from '../../../components/Input';
import SelectComponent from '../../../components/Select';
import ButtonComponent from '../../../components/Button';
import { COLORS, METRICS } from '../../../constants';
import schema from './schema';
import RegisterSteps from '../../../components/RegisterSteps';
import LabelComponent from '../../../components/Label';
import ErrorMessageComponent from '../../../components/ErrorMessage';
import InputContainerComponent from '../../../components/InputContainer';

export default function RegisterFirstStep({ navigation: { navigate } }) {
  const { t } = useTranslation();

  const navigateToSecondStep = ({ first_name, last_name, age, gender }) =>
    navigate('RegisterSecondStep', {
      first_name,
      last_name,
      age,
      gender,
    });

  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    defaultValues: {
      first_name: '',
      last_name: '',
      age: '',
      gender: '',
    },
    resolver: yupResolver(schema),
  });

  const submit = async (values) => {
    const { first_name, last_name, age, gender } = values;

    navigateToSecondStep({
      first_name,
      last_name,
      age,
      gender,
    });
  };

  return (
    <View style={styles.register}>
      <Container justifyContent="center">
        <RegisterSteps currentStep={0} />

        <InputContainerComponent>
          <LabelComponent>
            {t('register.firstStep.firstNameLabel')}
          </LabelComponent>
          <Controller
            name="first_name"
            control={control}
            render={({ field: { onChange, value, ref } }) => (
              <InputComponent
                onChangeText={(text) => {
                  onChange(text);
                }}
                value={value}
                inputRef={ref}
              />
            )}
          />
          <ErrorMessageComponent>
            {errors?.first_name?.message}
          </ErrorMessageComponent>
        </InputContainerComponent>

        <InputContainerComponent>
          <LabelComponent>
            {t('register.firstStep.lastNameLabel')}
          </LabelComponent>
          <Controller
            name="last_name"
            control={control}
            render={({ field: { onChange, value, ref } }) => (
              <InputComponent
                onChangeText={(text) => onChange(text)}
                value={value}
                inputRef={ref}
              />
            )}
          />
          <ErrorMessageComponent>
            {errors?.last_name?.message}
          </ErrorMessageComponent>
        </InputContainerComponent>

        <View style={{ flexDirection: 'row' }}>
          <InputContainerComponent
            style={{ flex: 1, marginRight: METRICS.margin }}
          >
            <LabelComponent>{t('register.firstStep.ageLabel')}</LabelComponent>
            <Controller
              name="age"
              control={control}
              render={({ field: { onChange, value, ref } }) => (
                <InputComponent
                  onChangeText={(text) => onChange(text)}
                  value={value}
                  inputRef={ref}
                  keyboardType="numeric"
                />
              )}
            />
            <ErrorMessageComponent>
              {errors?.age?.message}
            </ErrorMessageComponent>
          </InputContainerComponent>
          <InputContainerComponent style={{ flex: 1 }}>
            <LabelComponent>
              {t('register.firstStep.genderLabel')}
            </LabelComponent>
            <Controller
              name="gender"
              control={control}
              render={({ field: { onChange, value } }) => (
                <SelectComponent
                  items={[
                    { label: t('gender.male'), value: 'male' },
                    { label: t('gender.female'), value: 'female' },
                  ]}
                  value={value}
                  onValueChange={(values) => onChange(values)}
                />
              )}
            />
            <ErrorMessageComponent>
              {errors?.gender?.message}
            </ErrorMessageComponent>
          </InputContainerComponent>
        </View>

        <ButtonComponent
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
