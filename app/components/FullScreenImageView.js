import { MaterialCommunityIcons } from '@expo/vector-icons';
import { ReactNativeZoomableView } from '@openspacelabs/react-native-zoomable-view';
import React, { useRef } from 'react';
import {
  Animated,
  Dimensions,
  StyleSheet,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import ReactNativeModal from 'react-native-modal';
import colors from '../config/colors';
import Screen from './Screen';

const { width, height } = Dimensions.get('window');

function FullScreenImageView({ visible = false, url, onPress }) {
  if (!visible) return null;
  const scale = useRef(new Animated.Value(1)).current;
  const translateX = useRef(new Animated.Value(0)).current;

  return (
    <ReactNativeModal isVisible={visible}>
      <Screen style={styles.container}>
        <TouchableWithoutFeedback onPress={onPress}>
          <View style={styles.icon}>
            <MaterialCommunityIcons
              name='close-circle'
              size={25}
              color={colors.primary}
            />
          </View>
        </TouchableWithoutFeedback>
        <GestureHandlerRootView>
          <ReactNativeZoomableView
            maxZoom={30}
            minZoom={0.5}
            zoomStep={0.5}
            initialZoom={1}
            bindToBorders={true}
          >
            <Animated.Image
              style={{
                height,
                width,
                resizeMode: 'cover',
                transform: [{ scale }, { translateX }],
              }}
              source={{ uri: url }}
            />
          </ReactNativeZoomableView>
        </GestureHandlerRootView>
      </Screen>
    </ReactNativeModal>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    flex: 1,
    height: '100%',
    justifyContent: 'center',
    width: '100%',
  },
  icon: {
    position: 'absolute',
    right: 5,
    top: 5,
    zIndex: 1,
  },
});

export default FullScreenImageView;
