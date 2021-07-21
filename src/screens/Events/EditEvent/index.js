import React, { useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useTranslation } from 'react-i18next';
import Input from '../../../components/Input';
import DatePicker from '../../../components/DatePicker';
import Button from '../../../components/Button';
import { COLORS, METRICS } from '../../../constants';
import schema from './schema';
import InputContainer from '../../../components/InputContainer';
import Label from '../../../components/Label';
import ErrorMessage from '../../../components/ErrorMessage';
import TimePicker from '../../../components/TimePicker';
import { editEvent } from '../../../services/event';
import { notify } from '../../../helpers';
import SelectStates from '../../../components/SelectStates';
import SelectCity from '../../../components/SelectCity';
import { useLoader } from '../../../hooks';

export default function EditEvent({ route, navigation }) {
  const { t } = useTranslation();
  const { setLoading } = useLoader();

  const { event } = route.params;

  const {
    handleSubmit,
    control,
    formState: { errors },
    watch,
    setValue,
  } = useForm({
    defaultValues: {
      state_id: '',
      city_id: '',
      local: '',
      date: null,
      start_time: null,
      end_time: null,
      players_quantity: '',
    },
    resolver: yupResolver(schema),
  });

  const watchStateId = watch('state_id');

  const submit = async (values) => {
    try {
      setLoading(true);

      const {
        local,
        state_id,
        city_id,
        date,
        start_time,
        end_time,
        players_quantity,
      } = values;

      await editEvent(event.id, {
        local,
        state_id,
        city_id,
        date,
        start_time,
        end_time,
        players_quantity: players_quantity - 1,
      });

      notify({ message: t('editEvent.successMessage'), type: 'success' });

      setLoading(false);

      await navigation.navigate('ViewEvent', {
        eventId: event.id,
      });
    } catch (error) {
      setLoading(false);
      notify({ message: t('editEvent.errorMessage'), type: 'danger' });
    }
  };

  useEffect(() => {
    if (event) {
      setValue('state_id', event?.state_id);
      setValue('city_id', event?.city_id);
      setValue('local', event?.local);
      setValue('date', event?.date && new Date(event.date));
      setValue('start_time', event?.start_time && new Date(event.start_time));
      setValue('end_time', event?.end_time && new Date(event.end_time));
      setValue(
        'players_quantity',
        event?.players_quantity ? `${event.players_quantity + 1}` : ''
      );
    }
  }, [event]);

  return (
    <View style={styles.editEvent}>
      <View style={styles.editEventContainer}>
        <InputContainer>
          <Label>{t('editEvent.stateLabel')}</Label>
          <Controller
            name="state_id"
            control={control}
            render={({ field: { onChange, value } }) => (
              <SelectStates onChange={onChange} value={value} />
            )}
          />
          <ErrorMessage>{errors?.state_id?.message}</ErrorMessage>
        </InputContainer>

        <InputContainer>
          <Label>{t('editEvent.cityLabel')}</Label>
          <Controller
            name="city_id"
            control={control}
            render={({ field: { onChange, value } }) => (
              <SelectCity
                onChange={onChange}
                stateId={watchStateId}
                value={value}
              />
            )}
          />
          <ErrorMessage>{errors?.city_id?.message}</ErrorMessage>
        </InputContainer>

        <InputContainer>
          <Label>{t('editEvent.localLabel')}</Label>
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
          <Label>{t('editEvent.dateLabel')}</Label>
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
            <Label>{t('editEvent.startTimeLabel')}</Label>
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
            <Label>{t('editEvent.endTimeLabel')}</Label>
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
          <Label>{t('editEvent.playersQuantityLabel')}</Label>
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
          title={t('editEvent.submitButton')}
          onPress={handleSubmit(submit)}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  editEvent: {
    flex: 1,
    backgroundColor: COLORS.screenBackgroundColor,
  },
  editEventContainer: {
    marginVertical: METRICS.containerMarginVertical,
    marginHorizontal: METRICS.containerMarginHorizontal,
    flex: 1,
    justifyContent: 'center',
  },
});
