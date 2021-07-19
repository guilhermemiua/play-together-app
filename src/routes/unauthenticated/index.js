import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import i18next from 'i18next';
import Login from '../../screens/Login';
import InitialPage from '../../screens/InitialPage';
import RegisterFirstStep from '../../screens/Register/FirstStep';
import RegisterSecondStep from '../../screens/Register/SecondStep';
import { HEADER_STYLE, HEADER_TITLE_STYLE } from '../../constants';
import ForgotPassword from '../../screens/ForgotPassword';
import ForgotPasswordToken from '../../screens/ForgotPassword/Token';
import ForgotPasswordNewPassword from '../../screens/ForgotPassword/NewPassword';

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
          headerTitleStyle: {
            ...HEADER_TITLE_STYLE,
          },
          headerStyle: {
            ...HEADER_STYLE,
          },
        }}
      />
      <Stack.Screen
        name="RegisterFirstStep"
        component={RegisterFirstStep}
        options={{
          headerTitleStyle: {
            ...HEADER_TITLE_STYLE,
          },
          headerStyle: {
            ...HEADER_STYLE,
          },
          headerTitle: i18next.t('routes.register'),
        }}
      />
      <Stack.Screen
        name="RegisterSecondStep"
        component={RegisterSecondStep}
        options={{
          headerTitleStyle: {
            ...HEADER_TITLE_STYLE,
          },
          headerStyle: {
            ...HEADER_STYLE,
          },
          headerTitle: i18next.t('routes.register'),
        }}
      />
      <Stack.Screen
        name="ForgotPassword"
        component={ForgotPassword}
        options={{
          headerTitleStyle: {
            ...HEADER_TITLE_STYLE,
          },
          headerStyle: {
            ...HEADER_STYLE,
          },
          headerTitle: i18next.t('routes.forgotPassword'),
        }}
      />
      <Stack.Screen
        name="ForgotPasswordToken"
        component={ForgotPasswordToken}
        options={{
          headerTitleStyle: {
            ...HEADER_TITLE_STYLE,
          },
          headerStyle: {
            ...HEADER_STYLE,
          },
          headerTitle: i18next.t('routes.forgotPasswordToken'),
        }}
      />
      <Stack.Screen
        name="ForgotPasswordNewPassword"
        component={ForgotPasswordNewPassword}
        options={{
          headerTitleStyle: {
            ...HEADER_TITLE_STYLE,
          },
          headerStyle: {
            ...HEADER_STYLE,
          },
          headerTitle: i18next.t('routes.forgotPasswordNewPassword'),
        }}
      />
    </Stack.Navigator>
  );
}
