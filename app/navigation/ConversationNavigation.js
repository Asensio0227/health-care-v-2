import { Ionicons } from '@expo/vector-icons';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import colors from '../config/colors';
import ChatsScreen from '../screens/ChatsScreen';
import PHotoScreen from '../screens/PHotoScreen';
const Tab = createMaterialTopTabNavigator();
function ConversationNavigation() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => {
        return {
          tabBarLabel: () => {
            if (route.name === 'photo') {
              return <Ionicons name='camera' size={20} color={colors.white} />;
            } else {
              return (
                <Text style={{ color: colors.white }}>
                  {route.name.toLocaleUpperCase()}
                </Text>
              );
            }
          },
          tabBarShowIcon: true,
          tabBarLabelStyle: {
            color: colors.white,
          },
          tabBarIndicatorStyle: {
            backgroundColor: colors.white,
          },
          tabBarStyle: {
            backgroundColor: colors.secondary,
          },
        };
      }}
      initialRouteName='Chats'
    >
      <Tab.Screen name='photo' component={PHotoScreen} />
      <Tab.Screen name='Chats' component={ChatsScreen} />
    </Tab.Navigator>
  );
}

const styles = StyleSheet.create({
  container: {},
});

export default ConversationNavigation;
