import React from 'react';
import { View, StyleSheet } from 'react-native';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useTranslation } from 'react-i18next';

import Container from '../../../components/Container';
import Input from '../../../components/Input';
import Button from '../../../components/Button';
import { COLORS } from '../../../constants';
import schema from './schema';
import Label from '../../../components/Label';
import ErrorMessage from '../../../components/ErrorMessage';
import InputContainer from '../../../components/InputContainer';
import { notify } from '../../../helpers/showMessage';
import { updatePasswordByEmail } from '../../../services';
import { useLoader } from '../../../hooks';

export default function ForgotPasswordNewPassword({ navigation, route }) {
  const { t } = useTranslation();
  const { setLoading } = useLoader();

  const { email } = route.params;

  const navigateToLogin = () => navigation.navigate('Login');

  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    defaultValues: {
      password: '',
    },
    resolver: yupResolver(schema(t)),
  });

  const submit = async (values) => {
    try {
      setLoading(true);

      const { password } = values;

      await updatePasswordByEmail(email, password);

      notify({
        message: t('forgotPasswordNewPassword.successMessage'),
        type: 'success',
      });

      setLoading(false);

      await navigateToLogin();
    } catch (error) {
      setLoading(false);

      notify({
        message: t('forgotPasswordNewPassword.errorMessage'),
        type: 'danger',
      });
    }
  };

  return (
    <View style={styles.forgotPasswordNewPassword}>
      <Container justifyContent="center">
        <InputContainer>
          <Label>{t('forgotPasswordNewPassword.passwordLabel')}</Label>
          <Controller
            name="password"
            control={control}
            render={({ field: { onChange, value, ref } }) => (
              <Input
                onChangeText={(text) => {
                  onChange(text);
                }}
                value={value}
                inputRef={ref}
                secureTextEntry
              />
            )}
          />
          <ErrorMessage>{errors?.password?.message}</ErrorMessage>
        </InputContainer>

        <Button
          title={t('forgotPasswordNewPassword.submitButton')}
          onPress={handleSubmit(submit)}
        />
      </Container>
    </View>
  );
}

const styles = StyleSheet.create({
  forgotPasswordNewPassword: {
    flex: 1,
    backgroundColor: COLORS.screenBackgroundColor,
  },
});
