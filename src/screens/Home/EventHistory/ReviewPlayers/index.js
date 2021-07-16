import React, { useEffect, useState } from 'react';
import { View, StyleSheet, FlatList, Image } from 'react-native';
import { AirbnbRating } from 'react-native-elements';
import { useForm, Controller, useFieldArray } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { useTranslation } from 'react-i18next';
import { COLORS, normalize, METRICS } from '../../../../constants';
import Divider from '../../../../components/Divider';
import Title from '../../../../components/Title';
import DefaultProfileImage from '../../../../assets/images/DefaultProfile.png';
import Text from '../../../../components/Text';
import { getImage, notify } from '../../../../helpers';
import schema from './schema';
import { useAuth } from '../../../../hooks/useAuth';
import ErrorMessage from '../../../../components/ErrorMessage';
import Button from '../../../../components/Button';

export default function ReviewPlayers({ route, navigation }) {
  const { event } = route.params;

  const { t } = useTranslation();
  const { loggedUser } = useAuth();

  const [eventParticipants, setEventParticipants] = useState([]);

  const navigateToViewUser = (user) => {
    navigation.navigate('ViewUser', {
      title: `${user?.first_name} ${user?.last_name}`,
      user,
    });
  };

  const submit = async (values) => {
    try {
      console.log(values);
      // const { first_name, last_name, age, gender, state_id, city_id } = values;

      // await updateProfile({
      //   first_name,
      //   last_name,
      //   age,
      //   gender,
      //   state_id: parseInt(state_id, 10),
      //   city_id: parseInt(city_id, 10),
      //   profile_image: image,
      // });

      notify({ message: t('reviewPlayers.successMessage'), type: 'success' });

      await navigation.goBack();
    } catch (error) {
      console.log(error);
      notify({ message: t('reviewPlayers.errorMessage'), type: 'danger' });
    }
  };

  const {
    handleSubmit,
    control,
    formState: { errors },
    watch,
  } = useForm({
    defaultValues: {
      ratings: [],
    },
    resolver: yupResolver(schema),
  });

  const test = watch('ratings');

  useFieldArray({
    control, // control props comes from useForm (optional: if you are using FormContext)
    name: 'ratings',
  });

  useEffect(() => {
    if (event) {
      const newEventParticipants = event.users.filter(
        (eventUser) => loggedUser.id !== eventUser.id
      );

      if (loggedUser.id !== event.user.id) {
        newEventParticipants.push(event.user);
      }

      console.log(newEventParticipants);
      setEventParticipants(newEventParticipants);
    }
  }, [event]);

  useEffect(() => {
    console.log(test);
  }, [test]);

  return (
    <>
      <View style={styles.players}>
        {/* TODO: APPLY INFINITE */}
        <FlatList
          data={eventParticipants}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item, index }) => (
            <View style={[styles.player]}>
              <TouchableOpacity
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                }}
                onPress={() => navigateToViewUser(item)}
              >
                <Image
                  source={
                    item?.profile_image
                      ? {
                          uri: getImage(item?.profile_image),
                        }
                      : DefaultProfileImage
                  }
                  style={styles.playerImage}
                />
                <View>
                  <Title h4 color={COLORS.black} textAlign="left">
                    {item?.first_name} {item?.last_name}
                  </Title>
                </View>
              </TouchableOpacity>

              <Divider />

              <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
                <Controller
                  control={control}
                  name={`ratings[${index}].rating`}
                  defaultValue={5}
                  key={item.id}
                  render={({ field: { onChange, value } }) => (
                    <AirbnbRating
                      count={5}
                      defaultRating={value}
                      size={30}
                      showRating={false}
                      onFinishRating={(rating) => onChange(rating)}
                    />
                  )}
                />
                {errors.ratings &&
                  errors.ratings[index] &&
                  errors.ratings[index].name && (
                    <ErrorMessage>
                      {errors.ratings[index].name.message}
                    </ErrorMessage>
                  )}
              </View>
            </View>
          )}
        />
      </View>

      <View style={styles.submitContainer}>
        <Button
          title={t('reviewPlayers.submitButton')}
          onPress={handleSubmit(submit)}
        />
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  players: {
    flex: 1,
    backgroundColor: COLORS.screenBackgroundColor,
  },
  player: {
    backgroundColor: COLORS.white,
    paddingVertical: METRICS.padding,
    paddingHorizontal: METRICS.padding,
    flexDirection: 'column',
    justifyContent: 'center',
    borderColor: COLORS.borderColor,
    borderRadius: METRICS.borderRadius,
    borderBottomWidth: normalize(1),
  },
  playerImage: {
    width: normalize(45),
    height: normalize(45),
    borderRadius: normalize(45),
    borderColor: COLORS.borderColor,
    borderWidth: normalize(2),
    marginRight: normalize(10),
  },
  submitContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: COLORS.white,
    paddingHorizontal: METRICS.containerMarginHorizontal,
    paddingVertical: METRICS.containerMarginVertical,
    alignItems: 'center',
  },
});
