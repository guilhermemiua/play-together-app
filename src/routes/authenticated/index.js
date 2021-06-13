import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Icon } from 'react-native-elements';
import { View } from 'react-native';
import i18next from 'i18next';
import Events from '../../screens/Events';
import Profile from '../../screens/Profile';
import ChooseSport from '../../screens/Events/ChooseSport';
import Settings from '../../screens/Profile/Settings';
import { COLORS, HEADER_STYLE, HEADER_TITLE_STYLE } from '../../constants';
import CreateEvent from '../../screens/Events/ChooseSport/CreateEvent';
import ViewEvent from '../../screens/Events/ViewEvent';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

function HomeStackNavigator() {
  return (
    <Stack.Navigator initialRouteName="Home">
      <Stack.Screen
        name="Profile"
        component={Profile}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
}

function EventsStackNavigator() {
  return (
    <Stack.Navigator initialRouteName="Events">
      <Stack.Screen
        name="Events"
        component={Events}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="ChooseSport"
        component={ChooseSport}
        options={{ title: i18next.t('routes.chooseSport') }}
      />
      <Stack.Screen
        name="CreateEvent"
        component={CreateEvent}
        options={{ title: i18next.t('routes.createEvent') }}
      />
    </Stack.Navigator>
  );
}

function ChatsStackNavigator() {
  return (
    <Stack.Navigator initialRouteName="Chats">
      <Stack.Screen
        name="Profile"
        component={Profile}
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
        options={{ headerShown: false }}
      />

      <Stack.Screen
        name="Settings"
        component={Settings}
        options={({ route }) => {
          const title = route?.params?.title || i18next.t('routes.settings');

          return {
            headerTitleStyle: {
              ...HEADER_TITLE_STYLE,
            },
            headerStyle: {
              ...HEADER_STYLE,
            },
            title,
          };
        }}
      />
    </Stack.Navigator>
  );
}

function HomeTabs() {
  return (
    <Tab.Navigator>
      <Tab.Screen
        name="HomeTab"
        component={HomeStackNavigator}
        options={{
          tabBarIcon: ({ focused }) => (
            <Icon
              name="home"
              type="feather"
              color={focused ? COLORS.primary : COLORS.black}
              size={25}
            />
          ),
          tabBarShowLabel: false,
          headerShown: false,
        }}
      />
      <Tab.Screen
        name="EventsTab"
        component={EventsStackNavigator}
        options={{
          tabBarIcon: ({ focused }) => (
            <Icon
              name="navigation"
              type="feather"
              color={focused ? COLORS.primary : COLORS.black}
              size={25}
            />
          ),
          tabBarShowLabel: false,
          headerShown: false,
        }}
      />

      <Tab.Screen
        name="ChatsTab"
        component={ChatsStackNavigator}
        options={{
          tabBarIcon: ({ focused }) => (
            <Icon
              name="message-circle"
              type="feather"
              color={focused ? COLORS.primary : COLORS.black}
              size={25}
            />
          ),
          tabBarShowLabel: false,
          headerShown: false,
        }}
      />
      <Tab.Screen
        name="ProfileTab"
        component={ProfileStackNavigator}
        options={{
          tabBarIcon: ({ focused }) => (
            <Icon
              name="user"
              type="feather"
              color={focused ? COLORS.primary : COLORS.black}
              size={25}
            />
          ),
          tabBarShowLabel: false,
          headerShown: false,
        }}
      />
    </Tab.Navigator>
  );
}

export default function AuthenticatedRoutes() {
  return (
    <Stack.Navigator initialRouteName="Home">
      <Stack.Screen
        name="Home"
        component={HomeTabs}
        options={{
          headerShown: false,
        }}
      />

      <Stack.Screen
        name="ViewEvent"
        component={ViewEvent}
        options={({ route }) => {
          // const title = route?.params?.sport;

          const title = '';

          return {
            headerTitleStyle: {
              ...HEADER_TITLE_STYLE,
              elevation: 0,
              shadowOpacity: 0,
            },
            headerStyle: {
              ...HEADER_STYLE,
              backgroundColor: COLORS.black,
              elevation: 0,
              shadowOffset: {
                width: 0,
                height: 0,
              },
            },
            headerTintColor: COLORS.white,
            title,
          };
        }}
      />
    </Stack.Navigator>
  );
}
