import React from 'react';
import { createStackNavigator, Header } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Icon } from 'react-native-elements';
import i18next from 'i18next';
import Events from '../../screens/Events';
import Profile from '../../screens/Profile';
import Home from '../../screens/Home';
import ChooseSport from '../../screens/Events/ChooseSport';
import Settings from '../../screens/Profile/Settings';
import { COLORS, HEADER_STYLE, HEADER_TITLE_STYLE } from '../../constants';
import CreateEvent from '../../screens/Events/ChooseSport/CreateEvent';
import EditEvent from '../../screens/Events/EditEvent';
import EventSelectCity from '../../screens/Events/SelectCity';
import ViewEvent from '../../screens/Events/ViewEvent';
import EventChat from '../../screens/Events/ViewEvent/Chat';
import ViewEventSettings from '../../screens/Events/ViewEvent/Settings';
import EditProfile from '../../screens/Profile/EditProfile';
import ChangePassword from '../../screens/Profile/Settings/ChangePassword';
import ChangeEmail from '../../screens/Profile/Settings/ChangeEmail';
import Calendar from '../../screens/Home/Calendar';
import EventHistory from '../../screens/Home/EventHistory';
import Chats from '../../screens/Chats';
import ChatsSettings from '../../screens/Chats/Settings';
import Friends from '../../screens/Friends';
import AddFriend from '../../screens/Friends/AddFriend';
import ViewUser from '../../screens/ViewUser';
import Notifications from '../../screens/Friends/Notifications';
import NewChat from '../../screens/Chats/Settings/NewChat';
import FriendChat from '../../screens/Chats/FriendChat';
import ReviewPlayers from '../../screens/Home/EventHistory/ReviewPlayers';
import NewGroupChat from '../../screens/Chats/Settings/NewGroupChat';
import GroupChatHeader from '../../components/GroupChatHeader';
import ViewGroup from '../../screens/Chats/ViewGroup';
import GroupChat from '../../screens/Chats/GroupChat';
import GroupSettings from '../../screens/Chats/ViewGroup/Settings';
import EditGroup from '../../screens/Chats/ViewGroup/Settings/EditGroup';
import AddUser from '../../screens/Chats/ViewGroup/Settings/AddUser';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

function HomeStackNavigator() {
  return (
    <Stack.Navigator initialRouteName="Home">
      <Stack.Screen
        name="Home"
        component={Home}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Calendar"
        component={Calendar}
        options={{
          headerTitleStyle: {
            ...HEADER_TITLE_STYLE,
          },
          headerStyle: {
            ...HEADER_STYLE,
          },
          title: i18next.t('routes.calendar'),
        }}
      />
      <Stack.Screen
        name="EventHistory"
        component={EventHistory}
        options={{
          headerTitleStyle: {
            ...HEADER_TITLE_STYLE,
          },
          headerStyle: {
            ...HEADER_STYLE,
          },
          title: i18next.t('routes.eventHistory'),
        }}
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
        options={{
          headerTitleStyle: {
            ...HEADER_TITLE_STYLE,
          },
          headerStyle: {
            ...HEADER_STYLE,
          },
          title: i18next.t('routes.chooseSport'),
        }}
      />
      <Stack.Screen
        name="CreateEvent"
        component={CreateEvent}
        options={{
          headerTitleStyle: {
            ...HEADER_TITLE_STYLE,
          },
          headerStyle: {
            ...HEADER_STYLE,
          },
          title: i18next.t('routes.createEvent'),
        }}
      />
    </Stack.Navigator>
  );
}

function ChatsStackNavigator() {
  return (
    <Stack.Navigator initialRouteName="Chats">
      <Stack.Screen
        name="Chats"
        component={Chats}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="ChatsSettings"
        component={ChatsSettings}
        options={() => ({
          headerTitleStyle: {
            ...HEADER_TITLE_STYLE,
          },
          headerStyle: {
            ...HEADER_STYLE,
          },
          title: i18next.t('routes.settings'),
        })}
      />

      <Stack.Screen
        name="NewChat"
        component={NewChat}
        options={() => ({
          headerTitleStyle: {
            ...HEADER_TITLE_STYLE,
          },
          headerStyle: {
            ...HEADER_STYLE,
          },
          title: i18next.t('routes.newChat'),
        })}
      />

      <Stack.Screen
        name="NewGroupChat"
        component={NewGroupChat}
        options={() => ({
          headerTitleStyle: {
            ...HEADER_TITLE_STYLE,
          },
          headerStyle: {
            ...HEADER_STYLE,
          },
          title: i18next.t('routes.newGroupChat'),
        })}
      />
    </Stack.Navigator>
  );
}

function FriendsStackNavigator() {
  return (
    <Stack.Navigator initialRouteName="Friends">
      <Stack.Screen
        name="Friends"
        component={Friends}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="AddFriend"
        component={AddFriend}
        options={() => ({
          headerTitleStyle: {
            ...HEADER_TITLE_STYLE,
          },
          headerStyle: {
            ...HEADER_STYLE,
          },
          title: i18next.t('routes.addFriend'),
        })}
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
        options={() => ({
          headerTitleStyle: {
            ...HEADER_TITLE_STYLE,
          },
          headerStyle: {
            ...HEADER_STYLE,
          },
          title: i18next.t('routes.settings'),
        })}
      />

      <Stack.Screen
        name="EditProfile"
        component={EditProfile}
        options={() => ({
          headerTitleStyle: {
            ...HEADER_TITLE_STYLE,
          },
          headerStyle: {
            ...HEADER_STYLE,
          },
          title: i18next.t('routes.editProfile'),
        })}
      />

      <Stack.Screen
        name="ChangePassword"
        component={ChangePassword}
        options={() => ({
          headerTitleStyle: {
            ...HEADER_TITLE_STYLE,
          },
          headerStyle: {
            ...HEADER_STYLE,
          },
          title: i18next.t('routes.changePassword'),
        })}
      />

      <Stack.Screen
        name="ChangeEmail"
        component={ChangeEmail}
        options={() => ({
          headerTitleStyle: {
            ...HEADER_TITLE_STYLE,
          },
          headerStyle: {
            ...HEADER_STYLE,
          },
          title: i18next.t('routes.changeEmail'),
        })}
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
        name="FriendsTab"
        component={FriendsStackNavigator}
        options={{
          tabBarIcon: ({ focused }) => (
            <Icon
              name="users"
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
        options={{
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
          title: '',
        }}
      />

      <Stack.Screen
        name="ViewEventSettings"
        component={ViewEventSettings}
        options={() => ({
          headerTitleStyle: {
            ...HEADER_TITLE_STYLE,
          },
          headerStyle: {
            ...HEADER_STYLE,
          },
          title: i18next.t('routes.settings'),
        })}
      />
      <Stack.Screen
        name="EditEvent"
        component={EditEvent}
        options={{
          headerTitleStyle: {
            ...HEADER_TITLE_STYLE,
          },
          headerStyle: {
            ...HEADER_STYLE,
          },
          title: i18next.t('routes.editEvent'),
        }}
      />
      <Stack.Screen
        name="EventChat"
        component={EventChat}
        options={{
          headerTitleStyle: {
            ...HEADER_TITLE_STYLE,
          },
          headerStyle: {
            ...HEADER_STYLE,
          },
          title: i18next.t('routes.eventChat'),
        }}
      />

      <Stack.Screen
        name="ViewUser"
        component={ViewUser}
        options={({ route }) => {
          const { title = '' } = route.params;

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

      <Stack.Screen
        name="FriendChat"
        component={FriendChat}
        options={({ route }) => {
          const { title = '' } = route.params;

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

      <Stack.Screen
        name="GroupChat"
        component={GroupChat}
        options={({ route }) => {
          const { title = '', group } = route.params;

          return {
            headerTitle: (props) => (
              <GroupChatHeader {...props} title={title} group={group} />
            ),
            headerStyle: {
              ...HEADER_STYLE,
            },
          };
        }}
      />

      <Stack.Screen
        name="ViewGroup"
        component={ViewGroup}
        options={({ route }) => {
          const { title = '' } = route.params;

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

      <Stack.Screen
        name="GroupSettings"
        component={GroupSettings}
        options={() => ({
          headerTitleStyle: {
            ...HEADER_TITLE_STYLE,
          },
          headerStyle: {
            ...HEADER_STYLE,
          },
          title: i18next.t('routes.settings'),
        })}
      />

      <Stack.Screen
        name="EditGroup"
        component={EditGroup}
        options={() => ({
          headerTitleStyle: {
            ...HEADER_TITLE_STYLE,
          },
          headerStyle: {
            ...HEADER_STYLE,
          },
          title: i18next.t('routes.editGroup'),
        })}
      />

      <Stack.Screen
        name="FriendsNotifications"
        component={Notifications}
        options={() => ({
          headerTitleStyle: {
            ...HEADER_TITLE_STYLE,
          },
          headerStyle: {
            ...HEADER_STYLE,
          },
          title: i18next.t('routes.notifications'),
        })}
      />

      <Stack.Screen
        name="ReviewPlayers"
        component={ReviewPlayers}
        options={{
          headerTitleStyle: {
            ...HEADER_TITLE_STYLE,
          },
          headerStyle: {
            ...HEADER_STYLE,
          },
          title: i18next.t('routes.reviewPlayers'),
        }}
      />

      <Stack.Screen
        name="EventSelectCity"
        component={EventSelectCity}
        options={{
          headerTitleStyle: {
            ...HEADER_TITLE_STYLE,
          },
          headerStyle: {
            ...HEADER_STYLE,
          },
          title: i18next.t('routes.selectCity'),
        }}
      />

      <Stack.Screen
        name="AddUserToGroup"
        component={AddUser}
        options={{
          headerTitleStyle: {
            ...HEADER_TITLE_STYLE,
          },
          headerStyle: {
            ...HEADER_STYLE,
          },
          title: i18next.t('routes.addUsers'),
        }}
      />
    </Stack.Navigator>
  );
}
