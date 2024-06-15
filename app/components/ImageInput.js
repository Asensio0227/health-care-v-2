import { MaterialCommunityIcons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import React, { useEffect } from 'react';
import { Alert, Image, StyleSheet, TouchableOpacity } from 'react-native';
import colors from '../config/colors';

function ImageInput({ imageUri, onChangeImage, ...otherProps }) {
  const requestPermission = async () => {
    try {
      const { granted } =
        await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (!granted)
        Alert.alert('You need to enable permission to access image library');
    } catch (error) {
      console.log(error);
    }
  };

  const handleImage = () => {
    if (!imageUri) selectImage();
    else {
      Alert.alert(
        'Are you sure you want to delete this image?',
        'This action cannot be undone',
        [
          {
            text: 'Cancel',
            style: 'cancel',
          },
          {
            text: 'Delete',
            onPress: () => {
              onChangeImage(null);
            },
            style: 'destructive',
          },
        ],
        { cancelable: false }
      );
    }
  };

  const selectImage = async () => {
    try {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        quality: 1,
      });
      if (!result.canceled) onChangeImage(result.assets[0].uri);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    requestPermission();
  }, []);

  return (
    <TouchableOpacity onPress={handleImage} style={styles.container}>
      {!imageUri ? (
        <MaterialCommunityIcons name='camera' size={40} color={colors.medium} />
      ) : (
        <Image
          source={{ uri: imageUri }}
          style={styles.image}
          {...otherProps}
        />
      )}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    backgroundColor: colors.lightGrey,
    borderRadius: 15,
    height: 100,
    justifyContent: 'center',
    overflow: 'hidden',
    width: 100,
  },
  cancel: {
    color: colors.secondary,
  },
  destructive: {
    color: colors.danger,
  },
  image: {
    height: '100%',
    width: '100%',
  },
});

export default ImageInput;
