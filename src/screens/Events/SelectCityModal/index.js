import React, { useEffect } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useTranslation } from 'react-i18next';
import { useAuth } from '../../../hooks';

import schema from './schema';
import InputContainer from '../../../components/InputContainer';
import Label from '../../../components/Label';
import ErrorMessage from '../../../components/ErrorMessage';
import SelectCity from '../../../components/SelectCity';
import SelectStates from '../../../components/SelectStates';
import Modal from '../../../components/Modal';
import { notify } from '../../../helpers';
import Button from '../../../components/Button';
import { getCityById } from '../../../services';

export default function SelectCityModal({ isOpen, toggle, setSelectedCity }) {
  const { t } = useTranslation();
  const { loggedUser } = useAuth();

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
    resolver: yupResolver(schema),
  });

  const watchStateId = watch('state_id');

  const submit = async (values) => {
    try {
      const { city_id } = values;

      const { data } = await getCityById(city_id);

      setSelectedCity(data?.name);

      toggle();
    } catch (error) {
      notify({
        message: t('selectCityModal.errorMessage'),
        type: 'danger',
      });
    }
  };

  useEffect(() => {
    if (loggedUser) {
      setValue('state_id', loggedUser?.state_id);
      setValue('city_id', loggedUser?.city_id);
    }
  }, [loggedUser]);

  return (
    <Modal
      isOpen={isOpen}
      toggle={toggle}
      title={t('changeLanguageModal.title')}
    >
      <InputContainer>
        <Label>{t('selectCityModal.stateLabel')}</Label>
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
        <Label>{t('selectCityModal.cityLabel')}</Label>
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
        title={t('selectCityModal.submitButton')}
        onPress={handleSubmit(submit)}
      />
    </Modal>
  );
}
