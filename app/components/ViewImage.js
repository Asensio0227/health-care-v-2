import { useState } from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';
import { Image } from 'react-native-expo-image-cache';
import FullScreenImageView from './FullScreenImageView';
import Screen from './Screen';

function ViewImage({ url }) {
  const [showModal, setShowModal] = useState(false);

  const preview = {
    uri: '../assets/project/ai.jpeg',
  };
  const uri = url;

  return (
    <Screen>
      <TouchableOpacity
        style={styles.imgContainer}
        onPress={() => {
          setShowModal(!showModal);
        }}
      >
        <Image style={styles.img} tint='light' {...{ preview, uri }} />
      </TouchableOpacity>
      <FullScreenImageView
        url={uri}
        onPress={() => setShowModal(false)}
        visible={showModal}
      />
    </Screen>
  );
}

const styles = StyleSheet.create({
  imgContainer: {
    flexDirection: 'row',
    height: 100,
    width: 100,
    padding: 5,
  },
  img: {
    width: '100%',
    height: '100%',
    borderRadius: 20,
  },
});

export default ViewImage;
