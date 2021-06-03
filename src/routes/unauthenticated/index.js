import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import Login from '../../screens/Login';
import InitialPage from '../../screens/InitialPage';
import RegisterFirstStep from '../../screens/Register/FirstStep';
import RegisterSecondStep from '../../screens/Register/SecondStep';

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
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen
        name="RegisterFirstStep"
        component={RegisterFirstStep}
        options={{
          headerTitle: 'Register',
        }}
      />
      <Stack.Screen
        name="RegisterSecondStep"
        component={RegisterSecondStep}
        options={{
          headerTitle: 'Register',
        }}
      />
    </Stack.Navigator>
  );
}
