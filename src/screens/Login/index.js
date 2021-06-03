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
import { useAuth } from '../../contexts/AuthContext';
import InputContainerComponent from '../../components/InputContainer';
import LabelComponent from '../../components/Label';
import ErrorMessageComponent from '../../components/ErrorMessage';

export default function Login({ navigation: { navigate } }) {
  const { t } = useTranslation();
  const { authenticate } = useAuth();

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

  const submit = async (values) => {
    await authenticate(values.email, values.password);
  };

  return (
    <View style={styles.login}>
      <Container justifyContent="center">
        <InputContainerComponent>
          <LabelComponent>{t('login.emailLabel')}</LabelComponent>
          <Controller
            name="email"
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
            {errors?.email?.message}
          </ErrorMessageComponent>
        </InputContainerComponent>

        <InputContainerComponent>
          <LabelComponent>{t('login.passwordLabel')}</LabelComponent>
          <Controller
            name="password"
            control={control}
            render={({ field: { onChange, value, ref } }) => (
              <InputComponent
                secureTextEntry
                onChangeText={(text) => onChange(text)}
                value={value}
                inputRef={ref}
              />
            )}
          />
          <ErrorMessageComponent>
            {errors?.password?.message}
          </ErrorMessageComponent>
        </InputContainerComponent>

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
