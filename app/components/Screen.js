import Constants from 'expo-constants';
import React from 'react';
import { SafeAreaView, StyleSheet, View } from 'react-native';

const Screen = ({ children, style, onLayout }) => {
  return (
    <SafeAreaView style={[styles.screen, style]}>
      <View style={[styles.view, style]} onLayout={onLayout}>
        {children}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    paddingTop: Constants.statusBarHeight,
  },
  view: {
    flex: 1,
  },
});

export default Screen;
