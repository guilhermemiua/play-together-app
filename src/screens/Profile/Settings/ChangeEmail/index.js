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

export default function ChangeEmail({ navigation }) {
  const { t } = useTranslation();

  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    defaultValues: {
      email: '',
    },
    resolver: yupResolver(schema),
  });

  const submit = async (values) => {
    console.log(values);
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
                secureTextEntry
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
