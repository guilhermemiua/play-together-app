import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Avatar } from 'react-native-elements';
import { COLORS, METRICS } from '../../constants';
import Container from '../../components/Container';
import InfoLabelComponent from '../../components/InfoLabel';
import TextComponent from '../../components/Text';
import Title from '../../components/Title';
import Button from '../../components/Button';
import Header from '../../components/Header';

export default function Profile({ navigation: { navigate } }) {
  const navigateToSettings = () => navigate('Settings');

  return (
    <View style={styles.profile}>
      <Header
        title="Profile"
        icons={[
          {
            name: 'settings',
            type: 'feather',
            onPress: navigateToSettings,
          },
        ]}
      />
      <Container justifyContent="flex-start">
        <Avatar
          containerStyle={{ alignSelf: 'center' }}
          size="xlarge"
          rounded
          title="+"
          source={{
            uri: 'https://s3.amazonaws.com/uifaces/faces/twitter/adhamdannaway/128.jpg',
          }}
        >
          <Avatar.Accessory size={35} />
        </Avatar>

        <Title h3 style={{ color: COLORS.black }}>
          Guilherme Eiti
        </Title>

        <View
          style={{
            backgroundColor: COLORS.white,
            borderRadius: METRICS.borderRadius,
            padding: METRICS.padding,
            // borderColor: COLORS.borderColor,
            // borderWidth: normalize(1),
          }}
        >
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
            }}
          >
            <InfoLabelComponent>Age</InfoLabelComponent>
            <TextComponent>12</TextComponent>
          </View>
        </View>

        <Button title="Edit profile info" />
      </Container>
    </View>
  );
}

const styles = StyleSheet.create({
  profile: {
    flex: 1,
    backgroundColor: COLORS.screenBackgroundColor,
  },
});
