import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';
import { ThemeProvider } from 'react-native-elements';

import { LogBox } from 'react-native';

import 'react-native-gesture-handler';

import Routes from './src/routes';
import AuthProvider from './src/contexts/AuthContext';
import theme from './src/styles/theme';

export default function App() {
  LogBox.ignoreAllLogs();

  return (
    <ThemeProvider theme={theme}>
      <AuthProvider>
        <NavigationContainer>
          <StatusBar style="auto" />

          <Routes />
        </NavigationContainer>
      </AuthProvider>
    </ThemeProvider>
  );
}