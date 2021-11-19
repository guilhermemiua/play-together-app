import React from 'react';
import { View, StyleSheet } from 'react-native';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useTranslation } from 'react-i18next';

import Container from '../../components/Container';
import InputComponent from '../../components/Input';
import ButtonComponent from '../../components/Button';
import { COLORS } from '../../constants';
import schema from './schema';
import LabelComponent from '../../components/Label';
import ErrorMessageComponent from '../../components/ErrorMessage';
import InputContainerComponent from '../../components/InputContainer';
import { notify } from '../../helpers/showMessage';
import { forgotPassword } from '../../services';
import { useLoader } from '../../hooks';

export default function ForgotPassword({ navigation }) {
  const { t } = useTranslation();
  const { setLoading } = useLoader();

  const navigateToToken = (email) =>
    navigation.navigate('ForgotPasswordToken', {
      email,
    });

  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    defaultValues: {
      email: '',
    },
    resolver: yupResolver(schema(t)),
  });

  const submit = async (values) => {
    try {
      setLoading(true);

      const { email } = values;

      await forgotPassword(email);

      notify({ message: t('forgotPassword.successMessage'), type: 'success' });

      setLoading(false);

      await navigateToToken(email);
    } catch (error) {
      setLoading(false);

      if (error.response.status === 404) {
        notify({ message: t('forgotPassword.userNotFound'), type: 'danger' });

        return;
      }

      notify({ message: t('forgotPassword.errorMessage'), type: 'danger' });
    }
  };

  return (
    <View style={styles.forgotPassword}>
      <Container justifyContent="center">
        <InputContainerComponent>
          <LabelComponent>{t('forgotPassword.emailLabel')}</LabelComponent>
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

        <ButtonComponent
          title={t('forgotPassword.submitButton')}
          onPress={handleSubmit(submit)}
        />
      </Container>
    </View>
  );
}

const styles = StyleSheet.create({
  forgotPassword: {
    flex: 1,
    backgroundColor: COLORS.screenBackgroundColor,
  },
});
