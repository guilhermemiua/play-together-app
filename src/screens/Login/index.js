import React from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useTranslation } from 'react-i18next';
import Container from '../../components/Container';
import InputComponent from '../../components/Input';
import ButtonComponent from '../../components/Button';
import { COLORS, METRICS } from '../../constants';
import schema from './schema';
import { useAuth } from '../../hooks';
import InputContainerComponent from '../../components/InputContainer';
import LabelComponent from '../../components/Label';
import ErrorMessageComponent from '../../components/ErrorMessage';
import TextComponent from '../../components/Text';

export default function Login({ navigation: { navigate } }) {
  const { t } = useTranslation();
  const { authenticate } = useAuth();

  const navigateToForgotPassword = () => navigate('ForgotPassword');

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
          <TextComponent style={styles.forgotPasswordText}>
            {t('login.forgotPassword')}{' '}
          </TextComponent>
          <TouchableOpacity onPress={navigateToForgotPassword}>
            <TextComponent style={styles.forgotPasswordButton}>
              {t('login.forgotPasswordButton')}
            </TextComponent>
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
    textAlign: 'left',
    fontSize: METRICS.fontSize,
    color: COLORS.black,
  },
  forgotPasswordButton: {
    color: COLORS.primary,
  },
});
