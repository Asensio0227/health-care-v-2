import { useNavigation } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { pickerImage } from '../utils/storage';

function PHotoScreen() {
  const navigation = useNavigation();
  const [cancelled, setCancelled] = useState(false);

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', async () => {
      const result = await pickerImage();
      navigation.navigate('Contact', { image: result });

      if (result.canceled) {
        setCancelled(true);
        setTimeout(() => navigation.navigate('Chats'), 100);
      }
    });

    return () => unsubscribe();
  }, [navigation, cancelled]);

  return <View />;
}

export default PHotoScreen;
