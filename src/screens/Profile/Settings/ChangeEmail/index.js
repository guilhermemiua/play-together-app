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
import { updateEmail } from '../../../../services';
import { notify } from '../../../../helpers';
import { useLoader } from '../../../../hooks';

export default function ChangeEmail({ navigation }) {
  const { t } = useTranslation();
  const { setLoading } = useLoader();

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

      await updateEmail(email);

      notify({ message: t('changeEmail.successMessage'), type: 'success' });

      setLoading(false);

      await navigation.navigate('Settings');
    } catch (error) {
      setLoading(false);
      notify({ message: t('changeEmail.errorMessage'), type: 'danger' });
    }
  };

  return (
    <View style={styles.changeEmail}>
      <View style={styles.changeEmailContainer}>
        <InputContainer>
          <Label>{t('changeEmail.emailLabel')}</Label>
          <Controller
            name="email"
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
          <ErrorMessage>{errors?.email?.message}</ErrorMessage>
        </InputContainer>

        <Button
          title={t('changeEmail.submitButton')}
          onPress={handleSubmit(submit)}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  changeEmail: {
    flex: 1,
    backgroundColor: COLORS.screenBackgroundColor,
  },
  changeEmailContainer: {
    marginVertical: METRICS.containerMarginVertical,
    marginHorizontal: METRICS.containerMarginHorizontal,
    flex: 1,
    justifyContent: 'center',
  },
});
