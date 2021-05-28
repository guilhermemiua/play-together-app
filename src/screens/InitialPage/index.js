import React, { useEffect } from 'react';
import {
  Text,
  StyleSheet,
  ImageBackground,
  TouchableOpacity,
  View,
} from 'react-native';
import InitialPageImage from '../../assets/images/InitialPage.jpg';
import { COLORS } from '../../constants/colors';
import ButtonComponent from '../../components/Button';
import TitleComponent from '../../components/Title';
import Container from '../../components/Container';
import { METRICS, SCREEN_WIDTH, SCREEN_HEIGHT } from '../../constants';

function InitialPage({ navigation: { navigate } }) {
  const navigateToLogin = () => navigate('Login');

  return (
    <>
      <ImageBackground
        source={InitialPageImage}
        style={styles.backgroundImage}
      />

      <View style={styles.overlay} />

      <Container
        justifyContent="flex-end"
        style={{
          marginBottom: METRICS.margin * 6,
        }}
      >
        <TitleComponent h1 textAlign="center">
          Play Together
        </TitleComponent>

        <ButtonComponent title="Register" style={styles.registerButton} />

        <View style={styles.loginView}>
          <Text style={styles.loginText}>Already a player? </Text>
          <TouchableOpacity onPress={navigateToLogin}>
            <Text style={styles.loginButton}>Login</Text>
          </TouchableOpacity>
        </View>
      </Container>
    </>
  );
}

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  overlay: {
    flex: 1,
    backgroundColor: COLORS.black,
    opacity: 0.5,
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  registerButton: {
    justifyContent: 'center',
    marginVertical: METRICS.margin,
  },
  loginView: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  loginText: {
    textAlign: 'center',
    fontSize: METRICS.fontSize * 0.9,
    color: COLORS.white,
  },
  loginButton: {
    color: COLORS.primary,
  },
});

export default InitialPage;
