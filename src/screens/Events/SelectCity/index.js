import React, { useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useTranslation } from 'react-i18next';
import { useEventFilter } from '../../../hooks';

import schema from './schema';
import InputContainer from '../../../components/InputContainer';
import Label from '../../../components/Label';
import ErrorMessage from '../../../components/ErrorMessage';
import SelectCity from '../../../components/SelectCity';
import SelectStates from '../../../components/SelectStates';
import { notify } from '../../../helpers';
import Button from '../../../components/Button';
import { getCityById } from '../../../services';
import { COLORS, METRICS } from '../../../constants';

export default function EventSelectCity({ navigation }) {
  const { t } = useTranslation();
  const { setCity, stateId, cityId, setCityId, setStateId } = useEventFilter();

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
    },
    resolver: yupResolver(schema(t)),
  });

  const watchStateId = watch('state_id');

  const submit = async (values) => {
    try {
      const { city_id, state_id } = values;

      const { data } = await getCityById(city_id);

      setCity(data?.name);
      setCityId(parseInt(city_id, 10));
      setStateId(parseInt(state_id, 10));

      await navigation.navigate('Events');
    } catch (error) {
      notify({
        message: t('eventSelectCity.errorMessage'),
        type: 'danger',
      });
    }
  };

  useEffect(() => {
    if (stateId && cityId) {
      setValue('state_id', stateId);
      setValue('city_id', cityId);
    }
  }, [stateId, cityId]);

  return (
    <View style={styles.container}>
      <InputContainer>
        <Label>{t('eventSelectCity.stateLabel')}</Label>
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
        <Label>{t('eventSelectCity.cityLabel')}</Label>
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

      <Button
        title={t('eventSelectCity.submitButton')}
        onPress={handleSubmit(submit)}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  selectCity: {
    flex: 1,
    backgroundColor: COLORS.screenBackgroundColor,
  },
  container: {
    marginVertical: METRICS.containerMarginVertical,
    marginHorizontal: METRICS.containerMarginHorizontal,
  },
});
