import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Platform } from 'react-native';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useTranslation } from 'react-i18next';
import { Avatar, normalize } from 'react-native-elements';
import * as ImagePicker from 'expo-image-picker';
import Input from '../../../../components/Input';
import Button from '../../../../components/Button';
import { COLORS, METRICS } from '../../../../constants';
import schema from './schema';
import InputContainer from '../../../../components/InputContainer';
import Label from '../../../../components/Label';
import ErrorMessage from '../../../../components/ErrorMessage';
import DefaultProfileImage from '../../../../assets/images/DefaultProfile.png';
import { createGroup } from '../../../../services';
import { notify } from '../../../../helpers';

export default function NewGroupChat({ navigation }) {
  const { t } = useTranslation();

  const [image, setImage] = useState(null);

  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: '',
    },
    resolver: yupResolver(schema),
  });

  const submit = async (values) => {
    try {
      const { name } = values;

      await createGroup({
        name,
        group_image: image || undefined,
      });

      notify({ message: t('newGroupChat.successMessage'), type: 'success' });

      await navigation.goBack();
      await navigation.goBack();
    } catch (error) {

      notify({ message: t('newGroupChat.errorMessage'), type: 'danger' });
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
    <View style={styles.newGroupChat}>
      <View style={styles.newGroupChatContainer}>
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
          <Label>{t('newGroupChat.nameLabel')}</Label>
          <Controller
            name="name"
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
          <ErrorMessage>{errors?.name?.message}</ErrorMessage>
        </InputContainer>

        <Button
          title={t('newGroupChat.submitButton')}
          onPress={handleSubmit(submit)}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  newGroupChat: {
    flex: 1,
    backgroundColor: COLORS.screenBackgroundColor,
  },
  newGroupChatContainer: {
    marginVertical: METRICS.containerMarginVertical,
    marginHorizontal: METRICS.containerMarginHorizontal,
    flex: 1,
    justifyContent: 'center',
  },
  groupImage: {
    alignSelf: 'center',
    marginBottom: normalize(METRICS.margin / 2),
    backgroundColor: COLORS.white,
  },
});
