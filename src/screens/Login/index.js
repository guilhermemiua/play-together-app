import React from 'react';
import { View, Text, StyleSheet, ImageBackground } from 'react-native';
import InitialPageImage from '../../assets/images/InitialPage.jpg';

export default function Login({ navigation: { navigate } }) {
  return (
    <ImageBackground source={InitialPageImage} style={styles.backgroundImage}>
      <Text>Play Together</Text>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center',
  },
});
