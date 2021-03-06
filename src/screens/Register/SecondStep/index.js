import React from 'react';
import { View, StyleSheet } from 'react-native';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useTranslation } from 'react-i18next';

import Container from '../../../components/Container';
import InputComponent from '../../../components/Input';
import ButtonComponent from '../../../components/Button';
import { COLORS } from '../../../constants';
import schema from './schema';
import LabelComponent from '../../../components/Label';
import ErrorMessageComponent from '../../../components/ErrorMessage';
import InputContainerComponent from '../../../components/InputContainer';
import { notify } from '../../../helpers/showMessage';
import { register } from '../../../services';
import { useLoader } from '../../../hooks';

export default function RegisterSecondStep({
  navigation: { navigate },
  route,
}) {
  const { t } = useTranslation();
  const { setLoading } = useLoader();

  const { first_name, last_name, age, gender, state_id, city_id } =
    route.params;

  const navigateToInitialPage = () => navigate('InitialPage');

  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    defaultValues: {
      email: '',
      password: '',
    },
    resolver: yupResolver(schema(t)),
  });

  const submit = async (values) => {
    try {
      setLoading(true);

      const { email, password } = values;

      await register({
        first_name,
        last_name,
        age,
        gender,
        email,
        password,
        state_id,
        city_id,
      });

      setLoading(false);

      notify({ message: t('register.successMessage'), type: 'success' });

      await navigateToInitialPage();
    } catch (error) {
      setLoading(false);

      notify({ message: t('register.errorMessage'), type: 'danger' });
    }
  };

  return (
    <View style={styles.register}>
      <Container justifyContent="center">
        <InputContainerComponent>
          <LabelComponent>{t('register.secondStep.emailLabel')}</LabelComponent>
          <Controller
            name="email"
            control={control}
            render={({ field: { onChange, value, ref } }) => (
              <InputComponent
                onChangeText={(text) => {
                  onChange(text.trim());
                }}
                value={value}
                inputRef={ref}
                autoCapitalize="none"
              />
            )}
          />
          <ErrorMessageComponent>
            {errors?.email?.message}
          </ErrorMessageComponent>
        </InputContainerComponent>

        <InputContainerComponent>
          <LabelComponent>
            {t('register.secondStep.passwordLabel')}
          </LabelComponent>
          <Controller
            name="password"
            control={control}
            render={({ field: { onChange, value, ref } }) => (
              <InputComponent
                onChangeText={(text) => onChange(text)}
                value={value}
                inputRef={ref}
                secureTextEntry
                autoCapitalize="none"
              />
            )}
          />
          <ErrorMessageComponent>
            {errors?.password?.message}
          </ErrorMessageComponent>
        </InputContainerComponent>

        <ButtonComponent
          title={t('register.secondStep.submitButton')}
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
