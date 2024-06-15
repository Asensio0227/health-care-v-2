import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import colors from '../config/colors';
import SignScreen from '../screens/SignScreen';
import SignUpScreen from '../screens/SignUpScreen';
import WelcomeScreen from '../screens/WelcomeScreen';

const Stack = createNativeStackNavigator();

function AuthNavigation() {
  return (
    <Stack.Navigator screenOptions={{ headerTintColor: colors.secondary }}>
      <Stack.Screen
        options={{ headerShown: false }}
        name='Welcome'
        component={WelcomeScreen}
      />
      <Stack.Screen
        options={{ headerTitle: 'Sign-up' }}
        name='SignUp'
        component={SignUpScreen}
      />
      <Stack.Screen
        options={{ headerTitle: 'Sign-in' }}
        name='Sign'
        component={SignScreen}
      />
    </Stack.Navigator>
  );
}

const styles = StyleSheet.create({
  container: {},
});

export default AuthNavigation;
