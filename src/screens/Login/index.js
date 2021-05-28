import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useTranslation } from 'react-i18next';
import Container from '../../components/Container';
import InputComponent from '../../components/Input';
import ButtonComponent from '../../components/Button';
import { COLORS, METRICS } from '../../constants';
import schema from './schema';

export default function Login({ navigation: { navigate } }) {
  const { t } = useTranslation();

  const navigateToForgotPassword = () => navigate('Login');

  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    defaultValues: {
      email: '',
      password: '',
    },
    resolver: yupResolver(schema),
  });

  const submit = (values) => {
    try {
    } catch (err) {}
  };

  return (
    <View style={styles.login}>
      <Container justifyContent="center">
        <Controller
          name="email"
          control={control}
          render={({ field: { onChange, value, ref } }) => (
            <InputComponent
              label={t('login.emailLabel')}
              onChangeText={(text) => {
                onChange(text);
              }}
              value={value}
              inputRef={ref}
              errorMessage={errors?.email?.message}
            />
          )}
        />

        <Controller
          name="password"
          control={control}
          render={({ field: { onChange, value, ref } }) => (
            <InputComponent
              label={t('login.passwordLabel')}
              secureTextEntry
              onChangeText={(text) => onChange(text)}
              value={value}
              inputRef={ref}
              errorMessage={errors?.password?.message}
            />
          )}
        />

        <ButtonComponent title="Login" onPress={handleSubmit(submit)} />

        <View style={styles.forgotPasswordView}>
          <Text style={styles.forgotPasswordText}>
            {t('login.forgotPassword')}{' '}
          </Text>
          <TouchableOpacity onPress={navigateToForgotPassword}>
            <Text style={styles.forgotPasswordButton}>
              {t('login.forgotPasswordButton')}
            </Text>
          </TouchableOpacity>
        </View>
      </Container>
    </View>
  );
}

const styles = StyleSheet.create({
  login: {
    flex: 1,
    backgroundColor: COLORS.screenBackgroundColor,
  },
  forgotPasswordView: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: METRICS.margin,
  },
  forgotPasswordText: {
    textAlign: 'center',
    fontSize: METRICS.fontSize * 0.9,
    color: COLORS.black,
  },
  forgotPasswordButton: {
    color: COLORS.primary,
  },
});
