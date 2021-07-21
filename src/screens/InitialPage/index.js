import React from 'react';
import {
  StyleSheet,
  ImageBackground,
  TouchableOpacity,
  View,
} from 'react-native';
import { useTranslation } from 'react-i18next';
import InitialPageImage from '../../assets/images/InitialPage.jpg';
import { COLORS } from '../../constants/colors';
import ButtonComponent from '../../components/Button';
import TitleComponent from '../../components/Title';
import Container from '../../components/Container';
import { METRICS } from '../../constants';
import TextComponent from '../../components/Text';

function InitialPage({ navigation: { navigate } }) {
  const { t } = useTranslation();

  const navigateToLogin = () => navigate('Login');
  const navigateToRegister = () => navigate('RegisterFirstStep');

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

        <ButtonComponent
          title="Register"
          style={styles.registerButton}
          onPress={navigateToRegister}
        />

        <View style={styles.loginView}>
          <TextComponent style={styles.loginText}>
            {t('initialPage.alreadyAPlayer')}{' '}
          </TextComponent>
          <TouchableOpacity onPress={navigateToLogin}>
            <TextComponent style={styles.loginButton}>Login</TextComponent>
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
    backgroundColor: '#000000',
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
    fontSize: METRICS.fontSize,
    color: COLORS.white,
  },
  loginButton: {
    color: COLORS.primary,
  },
});

export default InitialPage;
