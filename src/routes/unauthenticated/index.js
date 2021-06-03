import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import i18next from 'i18next';
import Login from '../../screens/Login';
import InitialPage from '../../screens/InitialPage';
import RegisterFirstStep from '../../screens/Register/FirstStep';
import RegisterSecondStep from '../../screens/Register/SecondStep';
import { HEADER_OPTIONS } from '../../constants';

const Stack = createStackNavigator();

export default function UnauthenticatedRoutes() {
  return (
    <Stack.Navigator initialRouteName="InitialPage">
      <Stack.Screen
        name="InitialPage"
        component={InitialPage}
        options={{
          header: () => null,
        }}
      />
      <Stack.Screen
        name="Login"
        component={Login}
        options={{
          ...HEADER_OPTIONS,
        }}
      />
      <Stack.Screen
        name="RegisterFirstStep"
        component={RegisterFirstStep}
        options={{
          ...HEADER_OPTIONS,
          headerTitle: i18next.t('routes.register'),
        }}
      />
      <Stack.Screen
        name="RegisterSecondStep"
        component={RegisterSecondStep}
        options={{
          ...HEADER_OPTIONS,
          headerTitle: i18next.t('routes.register'),
        }}
      />
    </Stack.Navigator>
  );
}
