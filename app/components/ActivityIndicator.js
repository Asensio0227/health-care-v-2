import LottieView from 'lottie-react-native';
import React from 'react';
import { StyleSheet, View } from 'react-native';
import colors from '../config/colors';

const ActivityIndicator = ({ visible = false }) => {
  if (!visible) return null;
  return (
    <View style={styles.overlay}>
      <LottieView
        style={{ flex: 1 }}
        source={require('../assets/animation/spin.json')}
        autoPlay
        loop
      />
    </View>
  );
};

const styles = StyleSheet.create({
  overlay: {
    backgroundColor: colors.white,
    position: 'absolute',
    opacity: 0.8,
    width: '100%',
    height: '100%',
    zIndex: 1,
  },
});

export default ActivityIndicator;
