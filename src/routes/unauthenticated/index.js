import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import Login from '../../screens/Login';
import InitialPage from '../../screens/InitialPage';

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
    </Stack.Navigator>
  );
}
