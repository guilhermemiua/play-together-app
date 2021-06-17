import React from 'react';
import { View, StyleSheet } from 'react-native';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useTranslation } from 'react-i18next';
import Input from '../../../../components/Input';
import Button from '../../../../components/Button';
import { COLORS, METRICS } from '../../../../constants';
import schema from './schema';
import InputContainer from '../../../../components/InputContainer';
import Label from '../../../../components/Label';
import ErrorMessage from '../../../../components/ErrorMessage';
import { notify } from '../../../../helpers';
import { updatePassword } from '../../../../services';

export default function ChangePassword({ navigation }) {
  const { t } = useTranslation();

  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    defaultValues: {
      password: '',
      confirm_password: '',
    },
    resolver: yupResolver(schema),
  });

  const submit = async (values) => {
    try {
      const { password, confirm_password } = values;

      await updatePassword(password, confirm_password);

      notify({ message: t('changePassword.successMessage'), type: 'success' });

      await navigation.navigate('Settings');
    } catch (error) {
      notify({ message: t('changePassword.errorMessage'), type: 'danger' });
    }
  };

  return (
    <View style={styles.changePassword}>
      <View style={styles.changePasswordContainer}>
        <InputContainer>
          <Label>{t('changePassword.passwordLabel')}</Label>
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

        <InputContainer>
          <Label>{t('changePassword.confirmPasswordLabel')}</Label>
          <Controller
            name="confirm_password"
            control={control}
            render={({ field: { onChange, value, ref } }) => (
              <Input
                onChangeText={(text) => onChange(text)}
                value={value}
                inputRef={ref}
                secureTextEntry
              />
            )}
          />
          <ErrorMessage>{errors?.confirm_password?.message}</ErrorMessage>
        </InputContainer>

        <Button
          title={t('changePassword.submitButton')}
          onPress={handleSubmit(submit)}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  changePassword: {
    flex: 1,
    backgroundColor: COLORS.screenBackgroundColor,
  },
  changePasswordContainer: {
    marginVertical: METRICS.containerMarginVertical,
    marginHorizontal: METRICS.containerMarginHorizontal,
    flex: 1,
    justifyContent: 'center',
  },
});
