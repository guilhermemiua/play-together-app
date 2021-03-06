import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';
import { ThemeProvider } from 'react-native-elements';
import FlashMessage from 'react-native-flash-message';

import {
  LogBox,
  SafeAreaView,
  Platform,
  StatusBar as RNStatusBar,
} from 'react-native';

import 'react-native-gesture-handler';

import {
  useFonts,
  Lato_700Bold,
  Lato_400Regular,
  Lato_100Thin,
} from '@expo-google-fonts/lato';
import AppLoading from 'expo-app-loading';
import Routes from './routes';
import AuthProvider from './contexts/AuthContext';
import FilterEventProvider from './contexts/FilterEventContext';
import theme from './styles/theme';

import './internationalization';
import LoaderProvider from './contexts/LoaderContext';

export default function App() {
  LogBox.ignoreAllLogs();

  const [fontsLoaded] = useFonts({
    Lato_700Bold,
    Lato_400Regular,
    Lato_100Thin,
  });

  if (!fontsLoaded) {
    return <AppLoading />;
  }

  return (
    <SafeAreaView
      style={{
        paddingTop: Platform.OS === 'android' ? RNStatusBar.currentHeight : 0,
        flex: 1,
        backgroundColor: '#FFFFFF',
      }}
    >
      <ThemeProvider theme={theme}>
        <LoaderProvider>
          <AuthProvider>
            <FilterEventProvider>
              <NavigationContainer>
                <StatusBar style="auto" />

                <Routes />
              </NavigationContainer>
            </FilterEventProvider>
          </AuthProvider>
        </LoaderProvider>
      </ThemeProvider>

      <FlashMessage position="top" hideStatusBar />
    </SafeAreaView>
  );
}
