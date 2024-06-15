import React, { useRef } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import ImageInput from './ImageInput';

const ImageInputList = ({ imageUris = [], onAddImage, onRemoveImage }) => {
  const scrollRef = useRef();

  return (
    <View>
      <ScrollView
        ref={scrollRef}
        horizontal
        onContentSizeChange={() => scrollRef.current.scrollToEnd()}
      >
        <View style={styles.container}>
          {imageUris.map((uri) => (
            <View key={uri} style={styles.image}>
              <ImageInput
                key={uri}
                imageUri={uri}
                onChangeImage={() => onRemoveImage(uri)}
              />
            </View>
          ))}
          <ImageInput onChangeImage={(uri) => onAddImage(uri)} />
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
  },
  image: {
    marginRight: 10,
  },
});

export default ImageInputList;
