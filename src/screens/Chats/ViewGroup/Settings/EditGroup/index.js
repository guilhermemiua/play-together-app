import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Platform } from 'react-native';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useTranslation } from 'react-i18next';
import * as ImagePicker from 'expo-image-picker';
import { Avatar } from 'react-native-elements/dist/avatar/Avatar';
import Input from '../../../../../components/Input';
import Button from '../../../../../components/Button';
import { COLORS, METRICS } from '../../../../../constants';
import schema from './schema';
import InputContainer from '../../../../../components/InputContainer';
import Label from '../../../../../components/Label';
import ErrorMessage from '../../../../../components/ErrorMessage';
import DefaultProfileImage from '../../../../../assets/images/DefaultProfile.png';

import { editGroup } from '../../../../../services';
import { getImage, notify } from '../../../../../helpers';

export default function EditGroup({ route, navigation }) {
  const { t } = useTranslation();

  const { group } = route.params;

  const [image, setImage] = useState(null);

  const {
    handleSubmit,
    control,
    formState: { errors },
    setValue,
  } = useForm({
    defaultValues: {
      name: '',
    },
    resolver: yupResolver(schema),
  });

  const submit = async (values) => {
    try {
      const { name } = values;

      await editGroup(group.id, {
        name,
        group_image: image,
      });

      notify({ message: t('editGroupChat.successMessage'), type: 'success' });

      await navigation.goback();
      await navigation.goback();
    } catch (error) {
      notify({ message: t('editGroupChat.errorMessage'), type: 'danger' });
    }
  };

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.cancelled) {
      setImage(result.uri);
    }
  };

  useEffect(() => {
    if (group) {
      setValue('name', group?.name);
      // setValue('city_id', group?.city_id);

      if (group.group_image) {
        setImage(getImage(group.group_image));
      }
    }
  }, [group]);

  useEffect(() => {
    (async () => {
      if (Platform.OS !== 'web') {
        const { status } =
          await ImagePicker.requestMediaLibraryPermissionsAsync();

        if (status !== 'granted') {
          notify({
            message: t('mediaPermissionErrorMessage'),
            type: 'danger',
          });
        }
      }
    })();
  }, []);

  return (
    <View style={styles.editGroup}>
      <View style={styles.editGroupContainer}>
        <Avatar
          source={
            image
              ? {
                  uri: image,
                }
              : DefaultProfileImage
          }
          rounded
          size={150}
          containerStyle={styles.groupImage}
          onPress={pickImage}
        >
          <Avatar.Accessory
            size={40}
            color={COLORS.white}
            style={{ backgroundColor: COLORS.primary }}
          />
        </Avatar>

        <InputContainer>
          <Label>{t('editGroupChat.nameLabel')}</Label>
          <Controller
            name="name"
            control={control}
            render={({ field: { onChange, value } }) => (
              <Input onChange={onChange} value={value} />
            )}
          />
          <ErrorMessage>{errors?.name?.message}</ErrorMessage>
        </InputContainer>

        <Button
          title={t('editGroupChat.submitButton')}
          onPress={handleSubmit(submit)}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  editGroup: {
    flex: 1,
    backgroundColor: COLORS.screenBackgroundColor,
  },
  editGroupContainer: {
    marginVertical: METRICS.containerMarginVertical,
    marginHorizontal: METRICS.containerMarginHorizontal,
    flex: 1,
    justifyContent: 'center',
  },
});
