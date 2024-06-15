import { MaterialCommunityIcons } from '@expo/vector-icons';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import React from 'react';
import colors from '../config/colors';
import { useGlobalContext } from '../context/context';
import LandingScreen from '../screens/LandingScreen';
import ChatNavigation from './ChatNavigation';
import HomeNavigation from './HomeNavigation';

const Tab = createMaterialTopTabNavigator();

function AppNavigation() {
  const { users } = useGlobalContext();

  return (
    <Tab.Navigator>
      {users.emailVerified === false ||
        (users.displayName === null ? (
          <Tab.Screen
            options={{ headerTitle: 'Welcome to HealthCare' }}
            name='Landing'
            component={LandingScreen}
          />
        ) : (
          <>
            <Tab.Screen
              options={{
                tabBarIcon: ({ focused }) => (
                  <MaterialCommunityIcons
                    name='home'
                    color={focused ? colors.secondary : colors.primary}
                    size={24}
                  />
                ),
                tabBarLabel: ({ focused }) =>
                  focused ? (
                    <MaterialCommunityIcons
                      name='home'
                      color={focused ? colors.secondary : colors.primary}
                      size={24}
                    />
                  ) : null,
              }}
              name='Home'
              component={HomeNavigation}
            />
            <Tab.Screen
              options={{
                tabBarIcon: ({ focused }) => (
                  <MaterialCommunityIcons
                    name='chat'
                    color={focused ? colors.secondary : colors.primary}
                    size={24}
                  />
                ),
                tabBarLabel: ({ focused }) =>
                  focused ? (
                    <MaterialCommunityIcons
                      name='chat'
                      color={focused ? colors.secondary : colors.primary}
                      size={24}
                    />
                  ) : null,
              }}
              name='Message'
              component={ChatNavigation}
            />
          </>
        ))}
    </Tab.Navigator>
  );
}

export default AppNavigation;
