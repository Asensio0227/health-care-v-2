import * as Constants from 'expo-constants';
import * as Device from 'expo-device';
import * as Notifications from 'expo-notifications';
import { useEffect, useRef, useState } from 'react';
import { Linking, Platform } from 'react-native';
import navigation from '../navigation/rootNavigation';

function usePushNotifications() {
  Notifications.setNotificationHandler({
    handleNotification: async () => ({
      shouldPlaySound: true,
      shouldShowAlert: true,
      shouldSetBadge: true,
    }),
  });
  const [expoPushToken, setExpoPushToken] = useState(undefined);
  const [notification, setNotification] = useState(undefined);
  const notificationListener = useRef(null);
  const responseListener = useRef(null);

  const lastNotificationResponse = Notifications.useLastNotificationResponse();

  console.log(`'''last`);
  console.log(lastNotificationResponse);
  console.log(`'''last`);
  useEffect(() => {
    if (lastNotificationResponse) {
      const route = JSON.stringify(
        lastNotificationResponse.notification.request.content.data.route
      );

      //use some function to return the correct screen by route
      navigation.getFullPath(JSON.parse(route));
    }
  }, [lastNotificationResponse]);

  async function registerForPushNotificationsAsync() {
    let token;
    if (Platform.OS === 'android') {
      Notifications.setNotificationChannelAsync('default', {
        name: 'default',
        importance: Notifications.AndroidImportance.MAX,
        vibrationPattern: [0, 250, 250, 250],
        lightColor: '#FF231F7C',
      });
      if (Device.isDevice) {
        const { status: existingStatus } =
          await Notifications.getPermissionsAsync();
        let finalStatus = existingStatus;

        if (existingStatus !== 'granted') {
          const { status } = await Notifications.requestPermissionsAsync();
          finalStatus = status;
        }
        if (finalStatus !== 'granted') {
          alert('Failed to get push token for notifaction');
          return;
        }

        token = await Notifications.getExpoPushTokenAsync({
          projectId: Constants.expoConfig?.extra?.eas.projectId,
        });
      } else {
        alert('Must be using a physical device for Push notifictions');
      }
    }

    return token;
  }

  useEffect(() => {
    registerForPushNotificationsAsync().then((token) => {
      setExpoPushToken(token.data);
    });
    Notifications.addPushTokenListener(navigation.navigate('Chat'));

    notificationListener.current =
      Notifications.addNotificationReceivedListener((notification) => {
        setNotification(notification);
      });

    responseListener.current =
      Notifications.addNotificationResponseReceivedListener((response) => {
        const url = response.notification.request.content.data.url;
        Linking.openURL(url);
      });

    return () => {
      Notifications.removeNotificationSubscription(
        notificationListener.current
      );

      Notifications.removeNotificationSubscription(responseListener.current);
    };
  }, []);

  return {
    expoPushToken,
    notification,
  };
}

export async function sendPushNotification(expoPushToken, msg) {
  try {
    const message = msg.map((msg) => {
      const { text, user } = msg;
      return {
        to: expoPushToken,
        sound: 'default',
        title: 'New Message',
        body: text,
        data: user,
      };
    });

    await fetch('https://exp.host/--/api/v2/push/send', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Accept-encoding': 'gzip, deflate',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(message),
    });
  } catch (error) {
    console.log(error);
  }
}

export default usePushNotifications;
