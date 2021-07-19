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
import { validateToken } from '../../../services';

export default function ForgotPasswordToken({ navigation, route }) {
  const { t } = useTranslation();

  const { email } = route.params;

  const navigateToNewPassword = () =>
    navigation.navigate('ForgotPasswordNewPassword', {
      email,
    });

  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    defaultValues: {
      token: '',
    },
    resolver: yupResolver(schema),
  });

  const submit = async (values) => {
    try {
      const { token } = values;

      await validateToken(email, token);

      notify({
        message: t('forgotPasswordToken.successMessage'),
        type: 'success',
      });

      await navigateToNewPassword();
    } catch (error) {
      console.log(error);
      notify({
        message: t('forgotPasswordToken.errorMessage'),
        type: 'danger',
      });
    }
  };

  return (
    <View style={styles.forgotPasswordToken}>
      <Container justifyContent="center">
        <InputContainer>
          <Label>{t('forgotPasswordToken.tokenLabel')}</Label>
          <Controller
            name="token"
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
          <ErrorMessage>{errors?.token?.message}</ErrorMessage>
        </InputContainer>

        <Button
          title={t('forgotPasswordToken.submitButton')}
          onPress={handleSubmit(submit)}
        />
      </Container>
    </View>
  );
}

const styles = StyleSheet.create({
  forgotPasswordToken: {
    flex: 1,
    backgroundColor: COLORS.screenBackgroundColor,
  },
});
