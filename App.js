import { NavigationContainer } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import { onAuthStateChanged } from 'firebase/auth';
import { useCallback, useEffect, useState } from 'react';
import { View } from 'react-native';
import Screen from './app/components/Screen';
import colors from './app/config/colors';
import Wrapper from './app/context/Wrapper';
import { useGlobalContext } from './app/context/context';
import usePushNotifications from './app/hooks/usePushNotifications';
import AppNavigation from './app/navigation/AppNavigation';
import Auth from './app/navigation/AuthNavigation';
import Home from './app/navigation/HomeNavigation';
import SignUpScreen from './app/screens/SignUpScreen';
import { auth } from './firebase';

// npx expo install expo-dev-client;

SplashScreen.preventAutoHideAsync();

function App() {
  const { users, setUsers } = useGlobalContext();
  const [isReady, setIsReady] = useState(false);
  const [fontsLoaded, fontError] = useFonts({});
  const [loading, setLoading] = useState(false);
  const { expoPushToken, notification } = usePushNotifications();

  const onLayoutRootView = useCallback(async () => {
    if (isReady) {
      await SplashScreen.hideAsync();
    }
  }, [isReady, fontsLoaded, fontError]);

  useEffect(() => {
    setLoading(true);
    try {
      const unsubscribe = onAuthStateChanged(auth, (user) => {
        setLoading(false);
        if (user) setUsers(user);
        else {
          setUsers(null);
        }
      });
      return () => unsubscribe();
    } catch (error) {
      console.log(error);
    } finally {
      setIsReady(true);
    }
  }, []);

  if (!isReady) return null;

  if (fontsLoaded && fontError) return null;

  return (
    <Screen onLayout={onLayoutRootView}>
      <NavigationContainer>
        {users ? <AppNavigation /> : <Auth />}
      </NavigationContainer>
      {/* <NavigationContainer>{users ? <Home /> : <Auth />}</NavigationContainer> */}
    </Screen>
  );
}

export default function Main() {
  return (
    <Wrapper>
      <App />
    </Wrapper>
  );
}
