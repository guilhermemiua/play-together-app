import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Icon } from 'react-native-elements';
import { View } from 'react-native';
import Events from '../../screens/Events';
import Profile from '../../screens/Profile';
import Settings from '../../screens/Profile/Settings';
import { COLORS } from '../../constants';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

function EventsStackNavigator() {
  return (
    <Stack.Navigator initialRouteName="HomeStack">
      <Stack.Screen
        name="HomeStack"
        component={Events}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
}

function ProfileStackNavigator() {
  return (
    <Stack.Navigator initialRouteName="Profile">
      <Stack.Screen
        name="Profile"
        component={Profile}
        // options={{ headerShown: false }}
      />

      <Stack.Screen
        name="Settings"
        component={Settings}
        // options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
}

export default function AuthenticatedRoutes() {
  return (
    <Tab.Navigator>
      <Tab.Screen
        name="EventsTab"
        component={EventsStackNavigator}
        options={{
          tabBarIcon: () => (
            <Icon
              name="navigation"
              type="feather"
              color={COLORS.black}
              size={25}
            />
          ),
          tabBarShowLabel: false,
        }}
      />
      <Tab.Screen
        name="EventsHistoryTab"
        component={() => <View />}
        options={{
          tabBarIcon: () => (
            <Icon
              name="calendar"
              type="feather"
              color={COLORS.black}
              size={25}
            />
          ),
          tabBarShowLabel: false,
        }}
      />
      <Tab.Screen
        name="ChatsTab"
        component={() => <View />}
        options={{
          tabBarIcon: () => (
            <Icon
              name="message-circle"
              type="feather"
              color={COLORS.black}
              size={25}
            />
          ),
          tabBarShowLabel: false,
        }}
      />
      <Tab.Screen
        name="ProfileTab"
        component={ProfileStackNavigator}
        options={{
          tabBarIcon: () => (
            <Icon name="user" type="feather" color={COLORS.black} size={25} />
          ),
          tabBarShowLabel: false,
          headerShown: false,
        }}
      />
    </Tab.Navigator>
  );
}
