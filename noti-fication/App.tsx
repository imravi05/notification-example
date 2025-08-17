import "./global.css";

import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Ionicons } from '@react-native-vector-icons/ionicons';

import { HomeScreen } from 'components/screens/HomeScreen';
import NotificationsScreen from 'components/screens/NotificationsScreen';
import { UsersScreen } from 'components/screens/UsersScreen';
import DataCollectionForm from 'components/forms/DataCollection/Form';

import Toast from 'react-native-toast-message';
import { NotificationsProvider, useNotifications } from 'hooks/useNotifications';
import { navigationRef } from './navigation/RootNavigation';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

type IconNames = 'home' | 'home-outline' | 'notifications' | 'notifications-outline' | 'person' | 'person-outline' ;

const icons: { [key: string]: { active: IconNames; inactive: IconNames } } = {
  Home: { active: 'home', inactive: 'home-outline' },
  Notifications: { active: 'notifications', inactive: 'notifications-outline' },
  Users: { active: 'person', inactive: 'person-outline' },
};

function TabScreens() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          const icon = icons[route.name];
          if (!icon) return null;
          const iconName = focused ? icon.active : icon.inactive;
          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: 'tomato',
        tabBarInactiveTintColor: 'gray',
      })}
    >
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Notifications" component={NotificationsScreen} />
      <Tab.Screen name="Users" component={UsersScreen} />
    </Tab.Navigator>
  );
}

export default function App() {
  useNotifications();

  return (
    <>
      <NotificationsProvider>
        <NavigationContainer ref={navigationRef}>
          <Stack.Navigator>
            {/* Main tabbed screens */}
            <Stack.Screen
              name="MainTabs"
              component={TabScreens}
              options={{ headerShown: false }}
            />
            {/* Hidden screen, navigated manually */}
            <Stack.Screen
              name="DataCollectionForm"
              component={DataCollectionForm}
              options={{ title: 'Fill Form' }}
            />
          </Stack.Navigator>
        </NavigationContainer>
        <Toast />
      </NotificationsProvider>
    </>
  );
}
