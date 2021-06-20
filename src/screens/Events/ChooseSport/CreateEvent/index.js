import React from 'react';
import { View, StyleSheet } from 'react-native';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useTranslation } from 'react-i18next';
import Input from '../../../../components/Input';
import DatePicker from '../../../../components/DatePicker';
import Button from '../../../../components/Button';
import { COLORS, METRICS } from '../../../../constants';
import schema from './schema';
import InputContainer from '../../../../components/InputContainer';
import Label from '../../../../components/Label';
import ErrorMessage from '../../../../components/ErrorMessage';
import TimePicker from '../../../../components/TimePicker';
import Select from '../../../../components/Select';
import { createEvent } from '../../../../services/event';
import { notify } from '../../../../helpers';

export default function CreateEvent({ route, navigation }) {
  const { t } = useTranslation();

  const { sport } = route.params;

  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    defaultValues: {
      state: '',
      city: '',
      local: '',
      date: '',
      start_time: '',
      end_time: '',
      players_quantity: '',
    },
    resolver: yupResolver(schema),
  });

  const submit = async (values) => {
    try {
      const {
        local,
        state,
        city,
        date,
        start_time,
        end_time,
        players_quantity,
      } = values;

      await createEvent({
        sport,
        local,
        state,
        city,
        date,
        start_time,
        end_time,
        players_quantity,
      });

      notify({ message: t('createEvent.successMessage'), type: 'success' });

      await navigation.navigate('Events');
    } catch (error) {
      notify({ message: t('createEvent.errorMessage'), type: 'danger' });
    }
  };

  return (
    <View style={styles.createEvent}>
      <View style={styles.createEventContainer}>
        <InputContainer>
          <Label>{t('createEvent.stateLabel')}</Label>
          <Controller
            name="state"
            control={control}
            render={({ field: { onChange, value } }) => (
              <Select
                items={[{ label: 'SP', value: 'SP' }]}
                value={value}
                onValueChange={(values) => onChange(values)}
              />
            )}
          />
          <ErrorMessage>{errors?.state?.message}</ErrorMessage>
        </InputContainer>

        <InputContainer>
          <Label>{t('createEvent.cityLabel')}</Label>
          <Controller
            name="city"
            control={control}
            render={({ field: { onChange, value } }) => (
              <Select
                items={[{ label: 'Mogi das Cruzes', value: 'Mogi das Cruzes' }]}
                value={value}
                onValueChange={(values) => onChange(values)}
              />
            )}
          />
          <ErrorMessage>{errors?.city?.message}</ErrorMessage>
        </InputContainer>

        <InputContainer>
          <Label>{t('createEvent.localLabel')}</Label>
          <Controller
            name="local"
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
          <ErrorMessage>{errors?.local?.message}</ErrorMessage>
        </InputContainer>

        <InputContainer>
          <Label>{t('createEvent.dateLabel')}</Label>
          <Controller
            name="date"
            control={control}
            render={({ field: { onChange, value, ref } }) => (
              <DatePicker
                onChange={(selectedDate) => {
                  onChange(selectedDate);
                }}
                value={value}
                inputRef={ref}
              />
            )}
          />
          <ErrorMessage>{errors?.date?.message}</ErrorMessage>
        </InputContainer>

        <View style={{ flexDirection: 'row' }}>
          <InputContainer style={{ flex: 1, marginRight: METRICS.margin }}>
            <Label>{t('createEvent.startTimeLabel')}</Label>
            <Controller
              name="start_time"
              control={control}
              render={({ field: { onChange, value, ref } }) => (
                <TimePicker
                  onChange={(selectedDate) => {
                    onChange(selectedDate);
                  }}
                  value={value}
                  inputRef={ref}
                />
              )}
            />
            <ErrorMessage>{errors?.start_time?.message}</ErrorMessage>
          </InputContainer>

          <InputContainer style={{ flex: 1 }}>
            <Label>{t('createEvent.endTimeLabel')}</Label>
            <Controller
              name="end_time"
              control={control}
              render={({ field: { onChange, value, ref } }) => (
                <TimePicker
                  onChange={(selectedDate) => {
                    onChange(selectedDate);
                  }}
                  value={value}
                  inputRef={ref}
                />
              )}
            />
            <ErrorMessage>{errors?.end_time?.message}</ErrorMessage>
          </InputContainer>
        </View>

        <InputContainer>
          <Label>{t('createEvent.playersQuantityLabel')}</Label>
          <Controller
            name="players_quantity"
            control={control}
            render={({ field: { onChange, value, ref } }) => (
              <Input
                onChangeText={(text) => onChange(text)}
                value={value}
                inputRef={ref}
              />
            )}
          />
          <ErrorMessage>{errors?.players_quantity?.message}</ErrorMessage>
        </InputContainer>

        <Button
          title={t('createEvent.submitButton')}
          onPress={handleSubmit(submit)}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  createEvent: {
    flex: 1,
    backgroundColor: COLORS.screenBackgroundColor,
  },
  createEventContainer: {
    marginVertical: METRICS.containerMarginVertical,
    marginHorizontal: METRICS.containerMarginHorizontal,
    flex: 1,
    justifyContent: 'center',
  },
});
